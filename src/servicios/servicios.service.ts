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

  async create(createServicioDto: CreateServicioDto) {
    await this.servicioModel.create(createServicioDto);

    return {
      message: 'Servicio creado correctamente',
    };
  }

  async findAll(year: number, month: number) {
    const query = {};

    if (year && month) {
      const startDate = new Date(year, month - 1, 1); // Primer día del mes
      const endDate = new Date(year, month, 1); // Primer día del siguiente mes

      query['createdAt'] = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const servicios = await this.servicioModel
      .find(query)
      .sort({ createdAt: -1 });

    return {
      servicios,
      items: servicios.length,
    };
  }

  async findOne(id: number) {
    return await this.servicioModel.findById(id);
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
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

  async remove(id: string) {
    await this.servicioModel.findByIdAndDelete(id);

    return {
      message: 'Servicio eliminado correctamente',
    };
  }
}
