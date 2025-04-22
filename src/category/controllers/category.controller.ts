import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { ApiExcludeEndpoint, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService) {}
  
  @Get('top')
  @ApiQuery({ name: 'limit', required: true, type: Number })
  public async findTop(@Query('limit') num: Readonly<number>): Promise<Readonly<CategoryEntity[]>>  {
    return await this.categoryService.findTop(num);
  }

  @Get('notop')
  @ApiQuery({ name: 'from', required: true, type: Number })
  public async findNoTop(@Query('from') num: Readonly<number>): Promise<Readonly<CategoryEntity[]>>  {
    return await this.categoryService.findNoTop(num);
  }







  @Post()
  @ApiExcludeEndpoint()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
