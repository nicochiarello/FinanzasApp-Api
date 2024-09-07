import { Injectable } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './schemas/tarjeta.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TarjetasService {
  constructor(
    @InjectModel(Tarjeta.name) private tarjetaModel: Model<Tarjeta>,
  ) {}
  async create(createTarjetaDto: CreateTarjetaDto, userId: string) {
    await this.tarjetaModel.create({ ...createTarjetaDto, user: userId });

    return {
      message: 'Tarjeta creada correctamente',
    };
  }

  async findAll(userId) {
    const tarjetas = await this.tarjetaModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    return {
      tarjetas,
      items: tarjetas.length,
    };
  }

  async findOne(id: string, userId: string) {
    const foundTarjeta = await this.tarjetaModel.findById(id);

    if (!foundTarjeta) {
      return {
        message: 'Tarjeta no encontrada',
      };
    }

    if (foundTarjeta.user !== userId) {
      return {
        message: 'No tienes permisos para ver esta tarjeta',
      };
    }

    return foundTarjeta;
  }

  async update(id: string, updateTarjetaDto: UpdateTarjetaDto, userId: string) {
    const foundTarjeta = await this.tarjetaModel.findById(id);

    if (!foundTarjeta) {
      return {
        message: 'Tarjeta no encontrada',
      };
    }

    if (foundTarjeta.user !== userId) {
      return {
        message: 'No tienes permisos para actualizar esta tarjeta',
      };
    }

    await this.tarjetaModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateTarjetaDto,
      },
      {
        new: true,
      },
    );

    return {
      message: 'Tarjeta actualizada correctamente',
    };
  }

  async remove(id: string, userId: string) {
    const foundTarjeta = await this.tarjetaModel.findById(id);

    if (!foundTarjeta) {
      return {
        message: 'Tarjeta no encontrada',
      };
    }

    if (foundTarjeta.user !== userId) {
      return {
        message: 'No tienes permisos para eliminar esta tarjeta',
      };
    }

    await this.tarjetaModel.findByIdAndDelete(id);

    return {
      message: 'Tarjeta eliminada correctamente',
    };
  }
}
