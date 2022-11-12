import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { Collection } from './models/collection.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<Collection>,
  ) {}

  create(createCollectionInput: CreateCollectionInput) {
    const collection = new this.collectionModel(createCollectionInput);
    // Todo : Verify fields
    // Todo : Save picture in S3
    collection.date = new Date();
    return collection.save();
  }

  findAll() {
    return this.collectionModel.find().exec();
  }
}
