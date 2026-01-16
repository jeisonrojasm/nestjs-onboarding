import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboarding } from './entities/onboarding.entity';
import { Repository } from 'typeorm';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Onboarding)
    private readonly onboardingRepository: Repository<Onboarding>,
  ) { }

  async create(createOnboardingDto: CreateOnboardingDto) {
    const onboarding = this.onboardingRepository.create({
      ...createOnboardingDto,
      status: 'REQUESTED',
    });

    const saved = await this.onboardingRepository.save(onboarding);

    return {
      onboardingId: saved.id,
      status: saved.status,
    };
  }
}
