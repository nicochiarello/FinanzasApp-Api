import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Controller('/api/servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post('create')
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Get('all')
  findAll(@Query('year') year?: number, @Query('month') month?: number) {
    return this.serviciosService.findAll(year, month);
  }

  @Get(':id/details')
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOne(+id);
  }

  @Patch('/:id/update')
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(id);
  }
}
