import { Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gasto } from './schemas/gastos.schema';
import { Model } from 'mongoose';

@Injectable()
export class GastosService {
  constructor(@InjectModel(Gasto.name) private gastoModel: Model<Gasto>) {}

  async create(user, createGastoDto: CreateGastoDto) {
    const createdGasto = await this.gastoModel.create({
      ...createGastoDto,
      user,
    });

    return {
      message: 'Gasto creado correctamente',
      item: createdGasto,
    };
  }

  async findAll(user, month: number, year: number) {
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

    const gastos = await this.gastoModel
      .find({ ...query, user })
      .sort({ createdAt: -1 });

    return {
      gastos,
      items: gastos.length,
    };
  }

  async findOne(id: string, userId) {
    const foundGasto = await this.gastoModel.findById(id);

    if (foundGasto.user !== userId) {
      throw new Error('No tienes permisos para ver este gasto');
    }

    return foundGasto;
  }

  async update(id: string, updateGastoDto: UpdateGastoDto, userId) {
    const foundGasto = await this.gastoModel.findById(id);

    if (foundGasto.user !== userId) {
      throw new Error('No tienes permisos para actualizar este gasto');
    }

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

  async remove(id: string, userId) {
    const foundGasto = await this.gastoModel.findById(id);

    if (foundGasto.user !== userId) {
      throw new Error('No tienes permisos para eliminar este gasto');
    }

    await this.gastoModel.deleteOne({ _id: id });

    return {
      message: 'Gasto eliminado correctamente',
    };
  }
}
