import { Injectable } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './schemas/tarjeta.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TarjetasService {
  constructor(
    @InjectModel(Tarjeta.name) private servicioModel: Model<Tarjeta>,
  ) {}
  async create(createTarjetaDto: CreateTarjetaDto) {
    await this.servicioModel.create(createTarjetaDto);

    return {
      message: 'Tarjeta creada correctamente',
    };
  }

  async findAll(req: Request) {
    const user = req['user'];

    console.log(user);
    const tarjetas = await this.servicioModel.find().sort({ createdAt: -1 });

    return {
      tarjetas,
      items: tarjetas.length,
    };
  }

  async findOne(id: string) {
    return await this.servicioModel.findById(id);
  }

  async update(id: string, updateTarjetaDto: UpdateTarjetaDto) {
    await this.servicioModel.findByIdAndUpdate(
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

  async remove(id: string) {
    await this.servicioModel.findByIdAndDelete(id);

    return {
      message: 'Tarjeta eliminada correctamente',
    };
  }
}
