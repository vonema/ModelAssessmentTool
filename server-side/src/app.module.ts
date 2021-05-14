import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorTypeModule } from './errortype/errortype.module';
import { LearningOutcomeModule } from './learningoutcome/learningoutcome.module';
import { DomainConceptModule } from './domainconcept/domainconcept.module';
import { ContentSectionModule } from './contentsection/contentsection.module';
import { LearningItemModule } from './learningitem/learningitem.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kuleuvengrader:bloomberg@cluster0-jkave.gcp.mongodb.net/local_library?retryWrites=true&w=majority', { useNewUrlParser: true }),
    ErrorTypeModule,
    LearningOutcomeModule,
    DomainConceptModule,
    ContentSectionModule,
    LearningItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }