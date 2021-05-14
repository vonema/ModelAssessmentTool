import { Module } from '@nestjs/common';
import { ContentSectionController } from './contentsection.controller';
import { ContentSectionService } from './contentsection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSectionSchema } from './schemas/contentsection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ContentSection', schema: ContentSectionSchema }])
  ],
  controllers: [ContentSectionController],
  providers: [ContentSectionService]
})
export class ContentSectionModule { }
