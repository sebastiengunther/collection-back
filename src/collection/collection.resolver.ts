import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { Collection } from './models/collection.model';
import { CreateCollectionInput } from './dto/create-collection.input';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Mutation(() => Collection)
  createCollection(@Args('createCollectionInput') createCollectionInput: CreateCollectionInput) {
    return this.collectionService.create(createCollectionInput);
  }

  @Query(() => [Collection])
  getAllCollections() {
    return this.collectionService.findAll();
  }
}
