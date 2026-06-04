import { Test, type TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Resend } from 'resend';
import { ContactController } from './contact.controller';
import type { ContactDto } from './contact.dto';

jest.mock('resend', () => ({
  Resend: jest.fn(),
}));

const mockEmailsSend: jest.Mock = jest.fn();

describe('ContactController', () => {
  let controller: ContactController;

  beforeEach(async () => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.MAIL_TO = 'owner@example.com';
    mockEmailsSend.mockReset();
    (Resend as jest.Mock).mockImplementation(() => ({
      emails: { send: mockEmailsSend },
    }));

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  afterEach(() => {
    delete process.env.MAIL_TO;
    delete process.env.RESEND_API_KEY;
  });

  const valid: ContactDto = {
    name: 'Alice',
    email: 'alice@example.com',
    message: 'Hello there!',
  };

  describe('success', () => {
    it('resolves with undefined (204) for valid data', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await expect(controller.send(valid)).resolves.toBeUndefined();
    });

    it('calls Resend with the configured recipient', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await controller.send(valid);
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({ to: 'owner@example.com' }),
      );
    });

    it('includes the sender name in the email subject', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await controller.send(valid);
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: '[Portfolio] Message de Alice',
        }),
      );
    });

    it('includes sender name and email in the body text', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await controller.send(valid);
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({
          text: expect.stringContaining('alice@example.com'),
        }),
      );
    });

    it('trims whitespace from all fields before sending', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await controller.send({
        name: '  Alice  ',
        email: '  alice@example.com  ',
        message: '  Hi  ',
      });
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: '[Portfolio] Message de Alice',
        }),
      );
    });
  });

  describe('input validation', () => {
    it('throws BadRequestException when name is empty', async () => {
      await expect(controller.send({ ...valid, name: '' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws BadRequestException when name is whitespace only', async () => {
      await expect(controller.send({ ...valid, name: '   ' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws BadRequestException when email is empty', async () => {
      await expect(controller.send({ ...valid, email: '' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws BadRequestException when message is empty', async () => {
      await expect(controller.send({ ...valid, message: '' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws BadRequestException for invalid email format', async () => {
      await expect(
        controller.send({ ...valid, email: 'not-valid' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException for email without TLD', async () => {
      await expect(
        controller.send({ ...valid, email: 'user@nodomain' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('accepts a valid email with subdomain and plus-addressing', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await expect(
        controller.send({ ...valid, email: 'alice+tag@mail.example.co.uk' }),
      ).resolves.toBeUndefined();
    });
  });

  describe('server errors', () => {
    it('throws InternalServerErrorException when MAIL_TO is not configured', async () => {
      delete process.env.MAIL_TO;
      await expect(controller.send(valid)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('throws InternalServerErrorException when Resend returns an error', async () => {
      mockEmailsSend.mockResolvedValue({
        error: { message: 'Resend API failure' },
      });
      await expect(controller.send(valid)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
