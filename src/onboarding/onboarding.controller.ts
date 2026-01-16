import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

@Controller('onboarding')
@UseGuards(AuthGuard('jwt'))
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) { }

  @Post()
  async create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.create(createOnboardingDto);
  }
}
