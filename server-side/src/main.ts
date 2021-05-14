import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  app.listen(PORT, function() {
    console.log('Our app is running on port: ' + PORT);
  });
}
bootstrap();
