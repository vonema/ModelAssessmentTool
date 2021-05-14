import { Test, TestingModule } from '@nestjs/testing';
import { ContentSectionService } from './contentsection.service';

describe('ContentSectionService', () => {
  let service: ContentSectionService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentSectionService],
    }).compile();
    service = module.get<ContentSectionService>(ContentSectionService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
