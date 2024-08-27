import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';

@Controller('/api/gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post('/create')
  create(@Body() createGastoDto: CreateGastoDto) {
    return this.gastosService.create(createGastoDto);
  }

  @Get('/all')
  findAll() {
    return this.gastosService.findAll();
  }

  @Get('/:id/details')
  findOne(@Param('id') id: string) {
    return this.gastosService.findOne(id);
  }

  @Patch('/:id/update')
  update(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto) {
    return this.gastosService.update(id, updateGastoDto);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string) {
    return this.gastosService.remove(id);
  }
}
