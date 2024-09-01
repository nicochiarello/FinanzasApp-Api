import { Injectable } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { Cuota } from './schemas/cuota.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CuotasService {
  constructor(@InjectModel(Cuota.name) private cuotaModel: Model<Cuota>) {}

  async create(createCuotaDto: CreateCuotaDto) {
    await this.cuotaModel.create(createCuotaDto);

    return {
      message: 'Cuota creada correctamente',
    };
  }

  async findAll(month?: number, year?: number, card?: string) {
    let query = {};

    if (month && year) {
      const startDate = new Date(year, month - 1, 1); // Primer día del mes
      const endDate = new Date(year, month, 1); // Primer día del siguiente mes

      query = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    if (card) {
      query = {
        ...query,
        card,
      };
    }

    const cuotas = await this.cuotaModel
      .find(query)
      .populate('card')
      .sort({ createdAt: -1 });

    return {
      cuotas,
      items: cuotas.length,
    };
  }

  async findOne(id: string) {
    return await this.cuotaModel.findById(id);
  }

  async update(id: string, updateCuotaDto: UpdateCuotaDto) {
    await this.cuotaModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateCuotaDto,
      },
      {
        new: true,
      },
    );

    return {
      message: 'Cuota actualizada correctamente',
    };
  }

  async remove(id: string) {
    await this.cuotaModel.findByIdAndDelete(id);

    return {
      message: 'Cuota eliminada correctamente',
    };
  }
}
