import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { Collection } from './models/collection.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3 } from 'aws-sdk';
import { dataUriToBuffer, dataUriSize, dataUriType } from 'src/utils/DataUri';
import Const from 'src/Const';
import { isAddress } from 'web3-utils';

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
    let type: string;
    let size: number;

    // File check
    try {
      size = dataUriSize(collection.file);
      type = dataUriType(collection.file);
    } catch (err) {
      return new Error('File is mandatory');
    }

    if (size > Const.FILE_MAX_SIZE)
      return new Error(
        `Max file size is ${Const.FILE_MAX_SIZE / Const.B_TO_MB}MB (${
          size / Const.B_TO_MB
        }/${Const.FILE_MAX_SIZE / Const.B_TO_MB})`,
      );
    if (Const.IMAGE_MIME_TYPE.indexOf(type) === -1)
      return new Error(`File type "${type}" is not accepted`);

    // Blockchain check
    if (collection.blockchain.length === 0)
      return new Error('Blockchain is mandatory');
    if (Const.BLOCKCHAIN_DATA.indexOf(collection.blockchain) === -1)
      return new Error(
        `Blockchain must be a value in (${Const.BLOCKCHAIN_DATA.join(', ')})`,
      );

    // Protocol check
    if (collection.protocol.length === 0)
      return new Error('Protocol is mandatory');
    if (Const.PROTOCOL_DATA.indexOf(collection.protocol) === -1)
      return new Error(
        `Protocol must be a value in (${Const.PROTOCOL_DATA.join(', ')})`,
      );

    // Name check
    if (collection.name.length === 0) return new Error('Name is mandatory');
    if (collection.name.length < Const.NAME_MIN_LEN)
      return new Error(
        `Name must contain at least ${Const.NAME_MIN_LEN} characters (${collection.name.length}/${Const.NAME_MIN_LEN})`,
      );
    if (collection.name.length > Const.NAME_MAX_LEN)
      return new Error(
        `Name must contain a maximum of ${Const.NAME_MAX_LEN} characters (${collection.name.length}/${Const.NAME_MAX_LEN})`,
      );

    // Symbol check
    if (collection.symbol.length === 0) return new Error('Symbol is mandatory');
    if (collection.symbol.length < Const.SYMBOL_MIN_LEN)
      return new Error(
        `Symbol must contain at least ${Const.SYMBOL_MIN_LEN} characters (${collection.symbol.length}/${Const.SYMBOL_MIN_LEN})`,
      );
    if (collection.symbol.length > Const.SYMBOL_MAX_LEN)
      return new Error(
        `Symbol must contain a maximum of ${Const.SYMBOL_MAX_LEN} characters (${collection.symbol.length}/${Const.SYMBOL_MAX_LEN})`,
      );

    // Amount check
    if (collection.amount.length === 0) return new Error('Amount is mandatory');
    if (
      !(
        Number(collection.amount) ||
        (Number(collection.amount) === 0 && collection.amount.trim() !== '')
      )
    )
      return new Error('Amount must be a number');
    if (
      Number(collection.amount) < Const.AMOUNT_MIN ||
      Number(collection.amount) > Const.AMOUNT_MAX
    )
      return new Error(
        `Amount must be between ${Const.AMOUNT_MIN} and ${Const.AMOUNT_MAX}`,
      );

    // Owner check
    if (collection.owner.length === 0)
      return new Error('Owner is mandatory, connect to MetaMask');
    if (collection.owner.length !== Const.ADDRESS_LENGTH)
      return new Error(
        `Owner address must contain ${Const.ADDRESS_LENGTH} characters (${collection.owner.length}/${Const.ADDRESS_LENGTH})`,
      );
    if (!isAddress(collection.owner))
      return new Error('Owner must be a valid address');

    // Description check
    if (collection.description.length === 0)
      return new Error('Description is mandatory');
    if (collection.description.length < Const.DESCRIPTION_MIN_LEN)
      return new Error(
        `Description must contain at least ${Const.DESCRIPTION_MIN_LEN} characters (${collection.description.length}/${Const.DESCRIPTION_MIN_LEN})`,
      );
    if (collection.description.length > Const.DESCRIPTION_MAX_LEN)
      return new Error(
        `Description must contain a maximum of ${Const.DESCRIPTION_MAX_LEN} characters (${collection.description.length}/${Const.DESCRIPTION_MAX_LEN})`,
      );

    const uploadedImage = await this.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now().toString()}`,
        Body: dataUriToBuffer(collection.file),
        ContentType: type,
      })
      .promise();
    collection.file = uploadedImage.Location;

    collection.date = new Date();
    return collection.save();
  }

  findAll() {
    return this.collectionModel.find().exec();
  }
}
