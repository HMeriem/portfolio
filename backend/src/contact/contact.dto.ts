import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContactDto {
  @IsNotEmpty({ message: 'name, email and message are required' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @IsNotEmpty({ message: 'name, email and message are required' })
  @IsString()
  @MaxLength(5000)
  message!: string;
}
