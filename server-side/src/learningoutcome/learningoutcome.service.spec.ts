import { Test, TestingModule } from '@nestjs/testing';
import { LearningOutcomeService } from './learningoutcome.service';

describe('LearningOutcomeService', () => {
  let service: LearningOutcomeService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningOutcomeService],
    }).compile();
    service = module.get<LearningOutcomeService>(LearningOutcomeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
