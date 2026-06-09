import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();
    controller = module.get<HealthController>(HealthController);
  });

  it('returns status ok', () => {
    expect(controller.check().status).toBe('ok');
  });

  it('returns a valid ISO timestamp', () => {
    const { timestamp } = controller.check();
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  it('returns a non-negative uptime', () => {
    expect(controller.check().uptime).toBeGreaterThanOrEqual(0);
  });
});
