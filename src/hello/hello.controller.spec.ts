import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { LoggerService } from '../common/service/logger.service';

describe('HelloController', () => {
  let controller: HelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
          },
        }
      ],
    }).compile();

    controller = module.get<HelloController>(HelloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
