import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from '../common/common.module';
import { CollectionModule } from './collection.module';
import { CollectionService } from './collection.service';
import { Collection } from './models/collection.model';

describe('CollectionResolver', () => {
  let collectionService: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, CollectionModule],
    }).compile();

    collectionService = module.get<CollectionService>(CollectionService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(collectionService).toBeDefined();
    });

    it('should return an array of Collection', async () => {
      expect(await collectionService.findAll()).toBeInstanceOf(
        Array<Collection>,
      );
    });
  });
});
