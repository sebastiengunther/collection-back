import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckOutput } from './dto/health-check.output';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): HealthCheckOutput {
    return this.appService.getHealthCheck();
  }
}
