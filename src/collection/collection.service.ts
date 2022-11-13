import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { Collection } from './models/collection.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { dataUriToBuffer } from 'src/utils/DataUri';

@Injectable()
export class CollectionService {
  private readonly s3: S3;

  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<Collection>,
  ) {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async create(createCollectionInput: CreateCollectionInput) {
    const collection = new this.collectionModel(createCollectionInput);

    // Todo : Verify fields
    
    const fileType = collection.file.split(',')[0].match(/\/(.+?)[\+;]/)?.[1];
    const uploadedImage = await this.s3.upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${Date.now().toString()}.${fileType}`,
      Body: dataUriToBuffer(collection.file),
    }).promise();
    collection.file = uploadedImage.Location;

    collection.date = new Date();
    return collection.save();
  }

  findAll() {
    return this.collectionModel.find().exec();
  }
}
