import { Test, TestingModule } from '@nestjs/testing';
import { ErrorTypeController } from './errortype.controller';

describe('ErrorType Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ErrorTypeController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ErrorTypeController = module.get<ErrorTypeController>(ErrorTypeController);
    expect(controller).toBeDefined();
  });
});
