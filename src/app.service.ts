import { Injectable } from '@nestjs/common';
import { HealthCheck } from './dto/health-check.dto';

@Injectable()
export class AppService {
  getHealthCheck(): HealthCheck {
    return new HealthCheck('up');
  }
}
