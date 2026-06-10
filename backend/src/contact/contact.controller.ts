import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiTooManyRequestsResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Resend } from 'resend';
import { ContactDto } from './contact.dto';
import { buildContactEmail } from './contact.template';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  @ApiOperation({ summary: 'Send a contact message' })
  @ApiNoContentResponse({ description: 'Email sent successfully' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiTooManyRequestsResponse({ description: 'Rate limit exceeded' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async send(@Body() body: ContactDto): Promise<void> {
    const name = body.name.trim();
    const email = body.email.trim();
    const message = body.message.trim();

    const mailTo = process.env.MAIL_TO;
    if (!mailTo) {
      throw new InternalServerErrorException('MAIL_TO is not configured');
    }

    const { error } = await this.resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: mailTo,
      replyTo: email,
      subject: `[Portfolio] Message de ${name}`,
      html: buildContactEmail(name, email, message),
      text: `De : ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      this.logger.error('Resend error', error);
      throw new InternalServerErrorException('Email sending failed');
    }
  }
}
