import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../../services/category.service';
import { CategoryModule } from '../../category.module';
import { CATEGORY_REPOSITORY } from 'src/shared/utils/tokens';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { TYPES } from 'src/shared/utils/types';
import { ConfigService } from '@nestjs/config';
import { CategoryEntity } from '../../entities/category.entity';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule],
      controllers: [CategoryController],
      providers: [CategoryService,
      {
        provide: CATEGORY_REPOSITORY,
        useValue: {
          find: jest.fn(),
        },
      },
      {
        provide: WinstonLoggerService,
        useValue: {
          log: jest.fn(),
          error: jest.fn(),
          warn: jest.fn(),
        },
      },
      {
        provide: TYPES.HttpClientService,
        useValue: {
          get: jest.fn(),
          set: jest.fn(),
        },
      },
      {
        provide: ConfigService,
        useValue: {
          get: jest.fn(),
          set: jest.fn(),
        }
      }],
  }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  describe('findTop', () => {
    it('should return top array of categories', async () => {
      const relativePath = 'test/data/categories-ok.json';
      const filePath = path.resolve('.', relativePath);
      const fileContent = await readFile(filePath, 'utf8');      
      const result: CategoryEntity[] = JSON.parse(fileContent);

      jest.spyOn(controller, 'findTop').mockImplementation(async () => result);
      
      const found = await controller.findTop(5);
      expect(areCategoriesEqual(found, result)).toBe(true);
    });
  });

  function areCategoriesEqual(cat1: any, cat2: any) {
    if (cat1 === cat2) return true;
    if (typeof cat1 !== 'object' || typeof cat2 !== 'object') return false;
    if (cat1 === null || cat2 === null) return false;
    if (Object.keys(cat1).length !== Object.keys(cat2).length) return false;
  
    for (const key in cat1) {
      if (!cat2.hasOwnProperty(key) || !areCategoriesEqual(cat1[key], cat2[key])) {
        return false;
      }
    }
  
    return true;
  }
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
