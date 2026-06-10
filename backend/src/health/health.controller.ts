import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

@ApiTags('health')
@SkipThrottle()
@Controller('health')
export class HealthController {
  @ApiOperation({ summary: 'Check API health' })
  @ApiOkResponse({ description: 'API is healthy' })
  @Get()
  check(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
