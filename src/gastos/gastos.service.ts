import { Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gasto } from './schemas/gastos.schema';
import { Model } from 'mongoose';

@Injectable()
export class GastosService {
  constructor(@InjectModel(Gasto.name) private gastoModel: Model<Gasto>) {}

  async create(createGastoDto: CreateGastoDto) {
    const createdGasto = await this.gastoModel.create(createGastoDto);

    return {
      message: 'Gasto creado correctamente',
      item: createdGasto,
    };
  }

  async findAll(month: number, year: number) {
    let query = {};

    if (month && year) {
      const startDate = new Date(Date.UTC(year, month - 1, 1)); // Primer día del mes en UTC
      const endDate = new Date(Date.UTC(year, month, 1)); // Primer día del siguiente mes en UTC

      query = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    const gastos = await this.gastoModel.find(query).sort({ createdAt: -1 });

    return {
      gastos,
      items: gastos.length,
    };
  }

  async findOne(id: string) {
    return await this.gastoModel.findById(id);
  }

  async update(id: string, updateGastoDto: UpdateGastoDto) {
    const updated = await this.gastoModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateGastoDto,
      },
      {
        new: true,
      },
    );

    return {
      message: 'Gasto actualizado correctamente',
      item: updated,
    };
  }

  async remove(id: string) {
    await this.gastoModel.findByIdAndDelete(id);

    return {
      message: 'Gasto eliminado correctamente',
    };
  }
}
