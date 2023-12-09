
import { DeleteObjectCommand, PutObjectCommand, S3, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume as ResumeSchema } from '@reactive-resume/schema';
import axios from 'axios';
import fs from 'fs';
import { isEmpty, pick, sample, set } from 'lodash';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@/database/errorCodes.enum';
import { UsersService } from '@/users/users.service';

import { CreateScrapDto } from './dto/create-scrap.dto';
import { LinkedinScrapDto } from './dto/linkedin-scrap.dto';
import { UpdateScrapDto } from './dto/update-scrap.dto';
import { Scrap } from './entities/scrap.entity';
import { linkedinScrape } from './linkedinScraper';

@Injectable()
export class ScrapService {
  private s3Client: S3Client;
  private s3Enabled: boolean;
  constructor(
    @InjectRepository(Scrap) private scrapRepository: Repository<Scrap>,
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    this.s3Enabled = !isEmpty(configService.get<string>('storage.bucket'));

    if (this.s3Enabled) {
      this.s3Client = new S3({
        endpoint: configService.get<string>('storage.endpoint'),
        region: configService.get<string>('storage.region'),
        credentials: {
          accessKeyId: configService.get<string>('storage.accessKey'),
          secretAccessKey: configService.get<string>('storage.secretKey'),
        },
      });
    }
  }



 async create(createScrapDto: CreateScrapDto, userId: number) {

//i can get data from frontend successfully
    //addscrap to database


console.log(createScrapDto.title)
console.log("scrap service")


     try {
      const user = await this.usersService.findById(userId);

      //console.log(...createScrapDto)
      const title = createScrapDto.title;
      const website = createScrapDto.website;
      const location = createScrapDto.location;
      const link = createScrapDto.link;
      const date = createScrapDto.date;
      const user_id = userId;

      const scrap = this.scrapRepository.create({
        ...createScrapDto,
        userId
        
      });

      console.log(scrap)

     return await this.scrapRepository.save(scrap);
     // return true
    } catch (error: any) {
       console.log("error"+error)

      throw new HttpException(
        'Something went wrong. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
     
    }



    return 'This action adds a new scrap';
  }

  findAll() {
    return `This action returns all scrap`;
  }

  findAllByUser(uid: number) {
    return this.scrapRepository.find({ where: { userId: uid  } });
  }

  async linkedin(linkedinScrapDto: LinkedinScrapDto) {
    console.log(linkedinScrapDto);
    // const title , location = ...linkedinScrapDto;
  const { title, location } = linkedinScrapDto;
   console.log("getting results from linkedinScraper...");
    const result = await linkedinScrape(title, location)
    // console.log(result)
    console.log("got results...");

    const rawdata = fs.readFileSync('linkedin_scraped_data.json');
    const dataObj = JSON.parse(rawdata.toString());


    return dataObj;
  }

  findOne(id: number) {
    return `This action returns a #${id} scrap`;
  }

  async callChatGPT(input: string) {
    console.log(input.toString())

    try {
      // Make a request to the ChatGPT API (replace API_KEY with your actual API key)
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: "give me 5 tips on resume" },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      // Return the output from ChatGPT
      return { output: response.data.choices[0].message.content };
    } catch (error) {
      console.error(error);
      return { error: `Internal Server Error ${error}` };
    }
    
  }

  update(id: number, updateScrapDto: UpdateScrapDto) {
    return `This action updates a #${id} scrap`;
  }

  remove(id: number) {
    return `This action removes a #${id} scrap`;
  }
}
