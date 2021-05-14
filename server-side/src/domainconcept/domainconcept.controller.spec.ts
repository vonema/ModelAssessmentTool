import { Test, TestingModule } from '@nestjs/testing';
import { DomainConceptController } from './domainconcept.controller';

describe('DomainConceptController Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DomainConceptController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: DomainConceptController = module.get<DomainConceptController>(DomainConceptController);
    expect(controller).toBeDefined();
  });
});
