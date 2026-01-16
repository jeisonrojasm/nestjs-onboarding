import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Onboarding } from './onboarding/entities/onboarding.entity';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        Onboarding,
        Product,
      ],
      synchronize: true, // solo en dev
    }),
    TypeOrmModule.forFeature([
      Onboarding,
      Product,
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
