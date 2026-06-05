import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Resend } from 'resend';
import type { ContactDto } from './contact.dto';
import { buildContactEmail } from './contact.template';

@Controller('contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async send(@Body() body: ContactDto): Promise<void> {
    const name = body.name.trim();
    const email = body.email.trim();
    const message = body.message.trim();

    if (!name || !email || !message) {
      throw new BadRequestException('name, email and message are required');
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      throw new BadRequestException('Invalid email address');
    }

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
