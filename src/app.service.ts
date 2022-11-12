import { Injectable } from '@nestjs/common';
import { HealthCheckOutput } from './dto/health-check.output';

@Injectable()
export class AppService {
  getHealthCheck(): HealthCheckOutput {
    return new HealthCheckOutput('up');
  }
}
