import { Test, TestingModule } from '@nestjs/testing';
import { DomainConceptService } from './domainconcept.service';

describe('DomainConceptService', () => {
  let service: DomainConceptService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainConceptService],
    }).compile();
    service = module.get<DomainConceptService>(DomainConceptService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
