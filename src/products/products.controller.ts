import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductIdParamDto } from './dto/params.dto.ts';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @ApiOperation({ summary: 'Listado de productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param() params: ProductIdParamDto) {
    return this.productsService.findOne(params.id);
  }
}
