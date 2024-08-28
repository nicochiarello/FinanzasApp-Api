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
    await this.gastoModel.create(createGastoDto);

    return {
      message: 'Gasto creado correctamente',
    };
  }

  async findAll() {
    const gastos = await this.gastoModel.find().sort({ createdAt: -1 });

    return {
      gastos,
      items: gastos.length,
    };
  }

  async findOne(id: string) {
    return await this.gastoModel.findById(id);
  }

  async update(id: string, updateGastoDto: UpdateGastoDto) {
    await this.gastoModel.findByIdAndUpdate(
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
    };
  }

  async remove(id: string) {
    await this.gastoModel.findByIdAndDelete(id);

    return {
      message: 'Gasto eliminado correctamente',
    };
  }
}
