import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Collection {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Date, { description: 'Collection created date' })
  date: Date;

  @Prop()
  @Field(() => String, { description: 'Collection picture' })
  file: string;

  @Prop()
  @Field(() => String, { description: 'Blockchain' })
  blockchain: string;

  @Prop()
  @Field(() => String, { description: 'Protocol' })
  protocol: string;

  @Prop()
  @Field(() => String, { description: 'Collection name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Collection symbol' })
  symbol: string;

  @Prop()
  @Field(() => String, { description: 'Amount of NFTs in the collection' })
  amount: string;

  @Prop()
  @Field(() => String, { description: 'Collection owner address' })
  owner: string;

  @Prop()
  @Field(() => String, { description: 'Collection description' })
  description: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
