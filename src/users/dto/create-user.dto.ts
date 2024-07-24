import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { workTypeEnum, companyTypeEnum, employeesNumberEnum, jobTitleEnum } from './users.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(workTypeEnum)
  @IsNotEmpty()
  workType: string;

  @IsEnum(companyTypeEnum)
  @IsNotEmpty()
  companyType: string;

  @IsEnum(employeesNumberEnum)
  @IsNotEmpty()
  employeesNumber: string;

  @IsEnum(jobTitleEnum)
  @IsNotEmpty()
  jobTitle: string;
}