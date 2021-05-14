import { Test, TestingModule } from '@nestjs/testing';
import { LearningItemController } from './learningitem.controller';

describe('LearningItemController Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LearningItemController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LearningItemController = module.get<LearningItemController>(LearningItemController);
    expect(controller).toBeDefined();
  });
});
