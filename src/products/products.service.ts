import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class ProductsService {
  private readonly CACHE_TTL = 60;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly redisService: RedisService,
  ) { }

  async findAll(): Promise<Product[]> {
    const cacheKey = 'products:all';

    const cached = await this.redisService.get<Product[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const products = await this.productRepository.find();

    await this.redisService.set(cacheKey, products, this.CACHE_TTL);

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const cacheKey = `products:${id}`;

    const cached = await this.redisService.get<Product>(cacheKey);
    if (cached) {
      return cached;
    }

    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.redisService.set(cacheKey, product, this.CACHE_TTL);

    return product;
  }
}
