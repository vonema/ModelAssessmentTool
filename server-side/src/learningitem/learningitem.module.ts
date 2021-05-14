import { Module } from '@nestjs/common';
import { LearningItemController } from './learningitem.controller';
import { LearningItemService } from './learningitem.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningItemSchema } from './schemas/learningitem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LearningItem', schema: LearningItemSchema }])
  ],
  controllers: [LearningItemController],
  providers: [LearningItemService]
})
export class LearningItemModule { }
