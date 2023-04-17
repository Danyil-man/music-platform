import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.listen(port, () => console.log(`server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
