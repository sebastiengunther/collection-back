import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from '../common/common.module';
import { CollectionModule } from './collection.module';
import { CollectionResolver } from './collection.resolver';
import { Collection } from './models/collection.model';

describe('CollectionResolver', () => {
  let collectionResolver: CollectionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, CollectionModule],
    }).compile();

    collectionResolver = module.get<CollectionResolver>(CollectionResolver);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(collectionResolver).toBeDefined();
    });

    it('should return an array of Collection', async () => {
      expect(await collectionResolver.getAllCollections()).toBeInstanceOf(
        Array<Collection>,
      );
    });
  });
});
