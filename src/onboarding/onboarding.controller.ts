import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Onboarding')
@ApiBearerAuth('JWT-auth')
@Controller('onboarding')
@UseGuards(AuthGuard('jwt'))
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) { }

  @Post()
  @ApiOperation({ summary: 'Crear onboarding de cliente' })
  @ApiResponse({ status: 201, description: 'Onboarding creado' })
  async create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.create(createOnboardingDto);
  }
}
