import { Test, TestingModule } from '@nestjs/testing';
import { ErrorTypeService } from './errortype.service';

describe('ErrorTypeService', () => {
  let service: ErrorTypeService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorTypeService],
    }).compile();
    service = module.get<ErrorTypeService>(ErrorTypeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
