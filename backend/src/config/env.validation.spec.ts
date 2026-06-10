import { envValidationSchema } from './env.validation';

const valid = {
  RESEND_API_KEY: 'key_123',
  MAIL_TO: 'test@example.com',
};

describe('envValidationSchema', () => {
  it('accepts a fully valid configuration', () => {
    const { error } = envValidationSchema.validate({
      ...valid,
      NODE_ENV: 'production',
      PORT: 4000,
    });
    expect(error).toBeUndefined();
  });

  it('defaults NODE_ENV to development', () => {
    const { value } = envValidationSchema.validate(valid);
    expect(value.NODE_ENV).toBe('development');
  });

  it('defaults PORT to 4000', () => {
    const { value } = envValidationSchema.validate(valid);
    expect(value.PORT).toBe(4000);
  });

  it('accepts test as a valid NODE_ENV', () => {
    const { error } = envValidationSchema.validate({
      ...valid,
      NODE_ENV: 'test',
    });
    expect(error).toBeUndefined();
  });

  it('rejects an unknown NODE_ENV value', () => {
    const { error } = envValidationSchema.validate({
      ...valid,
      NODE_ENV: 'staging',
    });
    expect(error).toBeDefined();
  });

  it('rejects a PORT below 1024', () => {
    const { error } = envValidationSchema.validate({ ...valid, PORT: 80 });
    expect(error).toBeDefined();
  });

  it('requires RESEND_API_KEY', () => {
    const { error } = envValidationSchema.validate({ MAIL_TO: valid.MAIL_TO });
    expect(error).toBeDefined();
  });

  it('requires MAIL_TO', () => {
    const { error } = envValidationSchema.validate({
      RESEND_API_KEY: valid.RESEND_API_KEY,
    });
    expect(error).toBeDefined();
  });

  it('requires MAIL_TO to be a valid email', () => {
    const { error } = envValidationSchema.validate({
      ...valid,
      MAIL_TO: 'not-an-email',
    });
    expect(error).toBeDefined();
  });
});
