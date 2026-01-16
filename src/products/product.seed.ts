import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductSeed implements OnModuleInit {
  private readonly logger = new Logger(ProductSeed.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async onModuleInit() {
    const count = await this.productRepository.count();

    if (count > 0) {
      this.logger.log('Products already seeded');
      return;
    }

    const products = Array.from({ length: 10 }).map((_, i) => ({
      name: `Product ${i + 1}`,
      description: `Description for product ${i + 1}`,
      price: (i + 1) * 1000,
    }));

    await this.productRepository.save(products);
    this.logger.log('Products seeded successfully');
  }
}
