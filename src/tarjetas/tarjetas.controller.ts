import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Post('/create')
  create(@Body() createTarjetaDto: CreateTarjetaDto) {
    return this.tarjetasService.create(createTarjetaDto);
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  findAll(@Req() req: Request) {
    return this.tarjetasService.findAll(req);
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

  @UseGuards(AuthGuard)
  @Get('/protected')
  protectedRoute() {
    return {
      message: 'Esta es una ruta protegida',
    };
  }
}
