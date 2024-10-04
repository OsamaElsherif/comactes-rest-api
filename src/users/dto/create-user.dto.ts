import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { workTypeEnum, companyTypeEnum, employeesNumberEnum, jobTitleEnum } from './users.enum';
import { createAddressDto } from './create-address.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsPhoneNumber()
  phoneNumber: number;

  @IsNotEmpty()
  address: createAddressDto;

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