import { Body, Controller, Delete ,Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { OptionalJwtAuthGuard } from '@/auth/guards/optional-jwt.guard';
import { User } from '@/decorators/user.decorator';

import { CreateScrapDto } from './dto/create-scrap.dto';
import { LinkedinScrapDto } from './dto/linkedin-scrap.dto';
import { UpdateScrapDto } from './dto/update-scrap.dto';
import { ScrapService } from './scrap.service';



@Controller('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createScrapDto: CreateScrapDto,@User('id') userId: number) {
    console.log(createScrapDto)
    console.log("user id : "+userId)
    return this.scrapService.create(createScrapDto,userId);
  }

  @Get()
  findAll() {
    return this.scrapService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('oneuserscraps')
  async findAllByUser(@User('id') userId: number) {
    console.log("user id fetching records controller: "+userId)
    return this.scrapService.findAllByUser(userId);
  }

 @Post('linkedin')
  linkedin(@Body() linkedinScrapDto: LinkedinScrapDto) {
    console.log("linkedin controller");
    return this.scrapService.linkedin(linkedinScrapDto);
  }

  @Post('callChatGPT')
  callChatGPT(@Body() input: string) {
    console.log("callChatGPT controller");
    console.log(input)
    console.log(typeof input);
    const jsonInput = JSON.stringify(input);
    const parsedObject = JSON.parse(jsonInput);

  // Access the value using the key
  const inputValue = parsedObject.input;

    console.log(inputValue);
    return this.scrapService.callChatGPT(inputValue);
  }
 


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScrapDto: UpdateScrapDto) {
    return this.scrapService.update(+id, updateScrapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scrapService.remove(+id);
  }
}
