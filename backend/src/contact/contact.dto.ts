import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({ example: 'Alice Martin', maxLength: 100 })
  @IsNotEmpty({ message: 'name, email and message are required' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'alice@example.com' })
  @IsNotEmpty({ message: 'name, email and message are required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @ApiProperty({
    example: 'Bonjour, je souhaite vous contacter...',
    maxLength: 5000,
  })
  @IsNotEmpty({ message: 'name, email and message are required' })
  @IsString()
  @MaxLength(5000)
  message!: string;
}
