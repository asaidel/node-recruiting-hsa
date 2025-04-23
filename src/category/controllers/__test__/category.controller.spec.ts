import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../../services/category.service';
import { CategoryModule } from '../../category.module';
import { CATEGORY_REPOSITORY } from 'src/shared/utils/tokens';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { TYPES } from 'src/shared/utils/types';
import { ConfigService } from '@nestjs/config';

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
          save: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add tests for create, findOne, update, remove methods here
});
