export class HealthCheckOutput {
  constructor(status: string) {
    this.status = status;
  }

  status: string;
}
