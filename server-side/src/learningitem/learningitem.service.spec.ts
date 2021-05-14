import { Test, TestingModule } from '@nestjs/testing';
import { LearningItemService } from './learningitem.service';

describe('LearningItemService', () => {
  let service: LearningItemService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningItemService],
    }).compile();
    service = module.get<LearningItemService>(LearningItemService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
