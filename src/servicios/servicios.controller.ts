import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// /api/servicios
@UseGuards(AuthGuard)
@Controller('/servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post('create')
  create(@Body() createServicioDto: CreateServicioDto, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.serviciosService.create(createServicioDto, userId);
  }

  @Get('all')
  findAll(
    @Req() req,
    @Query('year') year?: number,
    @Query('month') month?: number,
  ) {
    const user = req['user'];
    const userId = user.sub;
    return this.serviciosService.findAll(userId, year, month);
  }

  @Get(':id/details')
  findOne(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.serviciosService.findOne(+id, userId);
  }

  @Patch('/:id/update')
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: UpdateServicioDto,
    @Req() req,
  ) {
    const user = req['user'];
    const userId = user.sub;
    return this.serviciosService.update(id, updateServicioDto, userId);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.serviciosService.remove(id, userId);
  }
}
