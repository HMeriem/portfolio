import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from '../config/env.validation';
import { HealthModule } from '../health/health.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),
    HealthModule,
    ContactModule,
  ],
})
export class AppModule {}
