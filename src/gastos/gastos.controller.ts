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
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// /api/gastos
@UseGuards(AuthGuard)
@Controller('/gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post('/create')
  create(@Body() createGastoDto: CreateGastoDto, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.gastosService.create(userId, createGastoDto);
  }

  @Get('/all')
  findAll(
    @Req() req,
    @Query('month') month?: number,
    @Query('year') year?: number,
  ) {
    const user = req['user'];
    const userId = user.sub;
    return this.gastosService.findAll(userId, month, year);
  }

  @Get('/:id/details')
  findOne(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.gastosService.findOne(id, userId);
  }

  @Patch('/:id/update')
  update(
    @Param('id') id: string,
    @Body() updateGastoDto: UpdateGastoDto,
    @Req() req,
  ) {
    const user = req['user'];
    const userId = user.sub;
    return this.gastosService.update(id, updateGastoDto, userId);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.gastosService.remove(id, userId);
  }
}
