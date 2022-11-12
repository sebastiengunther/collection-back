import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NestMongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongooseModule {}
