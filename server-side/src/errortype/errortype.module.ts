import { Module } from '@nestjs/common';
import { ErrorTypeController } from './errortype.controller';
import { ErrorTypeService } from './errortype.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorTypeSchema } from './schemas/errortype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ErrorType', schema: ErrorTypeSchema }])
  ],
  controllers: [ErrorTypeController],
  providers: [ErrorTypeService]
})
export class ErrorTypeModule { }
