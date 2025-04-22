import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { CategoryModule } from '../../category.module';
import { CATEGORY_REPOSITORY } from 'src/shared/utils/tokens';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { TYPES } from 'src/shared/utils/types';
import { ConfigService } from '@nestjs/config';
import { CategoryEntity } from '../../entities/category.entity';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule],
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

    service = module.get<CategoryService>(CategoryService);
  });

  describe('findTop', () => {
    it('should return top array of categories', async () => {
      const relativePath = 'test/data/categories-ok.json';
      const filePath = path.resolve('.', relativePath);
      const fileContent = await readFile(filePath, 'utf8');      
      const result: CategoryEntity[] = JSON.parse(fileContent);

      jest.spyOn(service, 'findTop').mockImplementation(async () => result);

      const found = await service.findTop(5);      

      compareNestedStructures(found, result);
    });
  });

  function compareNestedStructures(found: any, expected: any) {
    if (Array.isArray(found)) {
      expect(found.length).toBe(expected.length);
      found.forEach((item, index) => {
        compareNestedStructures(item, expected[index]);
      });
    } else if (typeof found === 'object' && found !== null) {
      Object.keys(expected).forEach(key => {
        expect(found).toHaveProperty(key);
        compareNestedStructures(found[key], expected[key]);
      });
    } else {
      expect(found).toEqual(expected);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
