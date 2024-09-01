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
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';

@Controller('/api/cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Post('create')
  create(@Body() createCuotaDto: CreateCuotaDto) {
    return this.cuotasService.create(createCuotaDto);
  }

  @Get('all')
  findAll(
    @Query('month') month?: number,
    @Query('year') year?: number,
    @Query('card') card?: string,
  ) {
    return this.cuotasService.findAll(month, year, card);
  }

  @Get('/:id/details')
  findOne(@Param('id') id: string) {
    return this.cuotasService.findOne(id);
  }

  @Patch('/:id/update')
  update(@Param('id') id: string, @Body() updateCuotaDto: UpdateCuotaDto) {
    return this.cuotasService.update(id, updateCuotaDto);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string) {
    return this.cuotasService.remove(id);
  }
}
