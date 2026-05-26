import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envValidationSchema } from '../config/env.validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        // Arrête l'application au démarrage si une variable requise est manquante
        abortEarly: false,
      },
    }),
    // Vos autres modules ici...
  ],
})
export class AppModule {}
