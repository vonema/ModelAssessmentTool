import { Module } from '@nestjs/common';
import { DomainConceptController } from './domainconcept.controller';
import { DomainConceptService } from './domainconcept.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainConceptSchema } from './schemas/domainconcept.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'DomainConcept', schema: DomainConceptSchema }])
  ],
  controllers: [DomainConceptController],
  providers: [DomainConceptService]
})
export class DomainConceptModule { }
