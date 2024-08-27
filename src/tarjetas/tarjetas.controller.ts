import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';

@Controller('/api/tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Post('/create')
  create(@Body() createTarjetaDto: CreateTarjetaDto) {
    return this.tarjetasService.create(createTarjetaDto);
  }

  @Get('/all')
  findAll() {
    return this.tarjetasService.findAll();
  }

  @Get('/:id/details')
  findOne(@Param('id') id: string) {
    return this.tarjetasService.findOne(id);
  }

  @Patch('/:id/update')
  update(@Param('id') id: string, @Body() updateTarjetaDto: UpdateTarjetaDto) {
    return this.tarjetasService.update(id, updateTarjetaDto);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string) {
    return this.tarjetasService.remove(id);
  }
}
