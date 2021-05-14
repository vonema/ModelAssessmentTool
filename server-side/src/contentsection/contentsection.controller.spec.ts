import { Test, TestingModule } from '@nestjs/testing';
import { ContentSectionController } from './contentsection.controller';

describe('ContentSection Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ContentSectionController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ContentSectionController = module.get<ContentSectionController>(ContentSectionController);
    expect(controller).toBeDefined();
  });
});
