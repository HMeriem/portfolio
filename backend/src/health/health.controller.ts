import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

@SkipThrottle()
@Controller('health')
export class HealthController {
  @Get()
  check(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
