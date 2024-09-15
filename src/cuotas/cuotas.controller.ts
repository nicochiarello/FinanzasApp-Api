import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { AuthGuard } from '../auth/auth.guard';

// /api/cuotas
@UseGuards(AuthGuard)
@Controller('/cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Post('create')
  create(@Body() createCuotaDto: CreateCuotaDto, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.cuotasService.create(createCuotaDto, userId);
  }

  @Get('all')
  findAll(
    @Req() req,
    @Query('month') month?: number,
    @Query('year') year?: number,
    @Query('card') card?: string,
  ) {
    const user = req['user'];
    const userId = user.sub;
    return this.cuotasService.findAll(userId, month, year, card);
  }

  @Get('/:id/details')
  findOne(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.cuotasService.findOne(id, userId);
  }

  @Patch('/:id/update')
  update(
    @Param('id') id: string,
    @Body() updateCuotaDto: UpdateCuotaDto,
    @Req() req,
  ) {
    const user = req['user'];
    const userId = user.sub;
    return this.cuotasService.update(id, updateCuotaDto, userId);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string, @Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.cuotasService.remove(id, userId);
  }
}
