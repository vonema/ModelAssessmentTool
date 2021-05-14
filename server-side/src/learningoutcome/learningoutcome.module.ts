import { Module } from '@nestjs/common';
import { LearningOutcomeController } from './learningoutcome.controller';
import { LearningOutcomeService } from './learningoutcome.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningOutcomeSchema } from './schemas/learningoutcome.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LearningOutcome', schema: LearningOutcomeSchema }])
  ],
  controllers: [LearningOutcomeController],
  providers: [LearningOutcomeService]
})
export class LearningOutcomeModule { }
