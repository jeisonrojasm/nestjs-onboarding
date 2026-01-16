import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from './entities/onboarding.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Onboarding,
    ])
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule { }
