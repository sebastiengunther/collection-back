import { Module } from '@nestjs/common';
import { GraphQLModule } from './graphql.module';
import { MongooseModule } from './mongoose.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [ConfigModule, GraphQLModule, MongooseModule],
  exports: [ConfigModule, GraphQLModule, MongooseModule],
})
export class CommonModule {}