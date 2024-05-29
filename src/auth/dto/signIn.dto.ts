import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsStrongPassword,
} from "class-validator";

export class SignInDto {
  @ApiProperty({ example: 'Pradipatil1@', description: 'Password length min 8,1 lowerscase and uppercase letter, 1 number ,1symbol' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
  @ApiProperty({ example: 'Patil@test.com', description: 'email of the user' })
  email: string;
}