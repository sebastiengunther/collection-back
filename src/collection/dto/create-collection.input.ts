import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field(() => String, { description: 'Collection picture' })
  file: string;

  @Field(() => String, { description: 'Blockchain' })
  blockchain: string;

  @Field(() => String, { description: 'Protocol' })
  protocol: string;

  @Field(() => String, { description: 'Collection name' })
  name: string;

  @Field(() => String, { description: 'Collection symbol' })
  symbol: string;

  @Field(() => String, { description: 'Amount of NFTs in the collection' })
  amount: string;

  @Field(() => String, { description: 'Collection owner address' })
  owner: string;

  @Field(() => String, { description: 'Collection description' })
  description: string;
}
