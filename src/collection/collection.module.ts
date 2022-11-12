import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionResolver } from './collection.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './models/collection.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Collection.name,
        schema: CollectionSchema,
      },
    ]),
  ],
  providers: [CollectionResolver, CollectionService],
})
export class CollectionModule {}
