import { Test, type TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
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

    it('sets replyTo to the sender email', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await controller.send(valid);
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({ replyTo: 'alice@example.com' }),
      );
    });

    it('sends both html and text versions', async () => {
      mockEmailsSend.mockResolvedValue({ error: null });
      await controller.send(valid);
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('Alice'),
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
