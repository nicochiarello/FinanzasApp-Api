import { Injectable } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Servicio } from './schemas/servicio.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectModel(Servicio.name) private servicioModel: Model<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto, userId: string) {
    await this.servicioModel.create({ ...createServicioDto, user: userId });

    return {
      message: 'Servicio creado correctamente',
    };
  }

  async findAll(userId, year: number, month: number) {
    let query = {};

    if (year && month) {
      const startDate = new Date(Date.UTC(year, month - 1, 1)); // Primer día del mes en UTC
      const endDate = new Date(Date.UTC(year, month, 1)); // Primer día del siguiente mes en UTC

      query = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    const servicios = await this.servicioModel
      .find({ ...query, user: userId })
      .sort({ createdAt: -1 });

    return {
      servicios,
      items: servicios.length,
    };
  }

  async findOne(id: number, userId: string) {
    const foundServicio = await this.servicioModel.findById(id);

    if (!foundServicio) {
      return {
        message: 'Servicio no encontrado',
      };
    }

    if (foundServicio.user !== userId) {
      return {
        message: 'No tienes permisos para ver este servicio',
      };
    }

    return {
      servicio: foundServicio,
    };
  }

  async update(
    id: string,
    updateServicioDto: UpdateServicioDto,
    userId: string,
  ) {
    const foundServicio = await this.servicioModel.findById(id);

    if (!foundServicio) {
      return {
        message: 'Servicio no encontrado',
      };
    }

    if (foundServicio.user !== userId) {
      return {
        message: 'No tienes permisos para actualizar este servicio',
      };
    }

    await this.servicioModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateServicioDto,
      },
      {
        new: true,
      },
    );

    return {
      message: 'Servicio actualizado correctamente',
    };
  }

  async remove(id: string, userId: string) {
    const foundServicio = await this.servicioModel.findById(id);

    if (!foundServicio) {
      return {
        message: 'Servicio no encontrado',
      };
    }

    if (foundServicio.user !== userId) {
      return {
        message: 'No tienes permisos para eliminar este servicio',
      };
    }

    await this.servicioModel.findByIdAndDelete(id);

    return {
      message: 'Servicio eliminado correctamente',
    };
  }
}
