import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class LinkedinScrapDto {
  @IsString()
  @IsNotEmpty()
  title: string;

@IsString()
  @IsNotEmpty()
  location: string;
 
}
