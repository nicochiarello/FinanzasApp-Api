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
import { AuthGuard } from '../auth/auth.guard';

// /api/tarjetas
@UseGuards(AuthGuard)
@Controller('/tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Post('/create')
  create(@Body() createTarjetaDto: CreateTarjetaDto, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.tarjetasService.create(createTarjetaDto, userId);
  }

  @Get('/all')
  findAll(@Req() req: Request) {
    const user = req['user'];
    const userId = user.sub;
    return this.tarjetasService.findAll(userId);
  }

  @Get('/:id/details')
  findOne(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.tarjetasService.findOne(id, userId);
  }

  @Patch('/:id/update')
  update(
    @Param('id') id: string,
    @Body() updateTarjetaDto: UpdateTarjetaDto,
    @Req() req,
  ) {
    const user = req['user'];
    const userId = user.sub;
    return this.tarjetasService.update(id, updateTarjetaDto, userId);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.tarjetasService.remove(id, userId);
  }
}
