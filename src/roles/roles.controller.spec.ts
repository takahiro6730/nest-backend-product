import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { LoggerService } from '../common/service/logger.service';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
          },
        }
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
