import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/redis/redis.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ProductsModule } from './products/products.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    OnboardingModule,
    ProductsModule,
    RedisModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true, // solo en dev
      synchronize: true, // solo en dev
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
