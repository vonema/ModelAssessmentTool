import { Test, TestingModule } from '@nestjs/testing';
import { LearningOutcomeController } from './learningoutcome.controller';

describe('LearningOutcome Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LearningOutcomeController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LearningOutcomeController = module.get<LearningOutcomeController>(LearningOutcomeController);
    expect(controller).toBeDefined();
  });
});
