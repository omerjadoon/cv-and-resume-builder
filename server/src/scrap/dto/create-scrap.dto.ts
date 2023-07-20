import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateScrapDto {
  @IsString()
  @IsNotEmpty()
  title: string;

@IsString()
  @IsNotEmpty()
  company: string;


@IsString()
  date: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  link: string;

   @IsString()
  location: string;

   @IsString()
  @IsNotEmpty()
  website: string;
 
}
