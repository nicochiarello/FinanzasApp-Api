import { Injectable } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { Cuota } from './schemas/cuota.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CuotasService {
  constructor(@InjectModel(Cuota.name) private cuotaModel: Model<Cuota>) {}

  async create(createCuotaDto: CreateCuotaDto, userId: string) {
    const { paid, qty, createdAt } = createCuotaDto;

    // Usar la fecha proporcionada o la fecha actual
    const initialDate = createdAt ? new Date(createdAt) : new Date();

    // Crear la cuota inicial
    const originalCuota = await this.cuotaModel.create({
      ...createCuotaDto,
      createdAt: initialDate,
      user: userId,
    });

    // Crear cuotas restantes en una colección separada
    const cuotasToCreate = [];

    for (let i = paid + 1; i <= qty; i++) {
      // Calcular la fecha de la cuota sumando meses
      const cuotaDate = new Date(initialDate);
      cuotaDate.setMonth(initialDate.getMonth() + i - paid);

      cuotasToCreate.push({
        ...createCuotaDto,
        paid: i,
        title: `${createCuotaDto.title}`,
        originalCuotaId: originalCuota._id, // Asociar la cuota generada con la cuota original
        createdAt: cuotaDate,
        user: userId,
      });
    }

    // Insertar todas las cuotas generadas
    if (cuotasToCreate.length > 0) {
      await this.cuotaModel.insertMany(cuotasToCreate);
    }

    return {
      message: 'Cuota creada correctamente, con cuotas generadas',
    };
  }
  async findAll(userId, month?: number, year?: number, card?: string) {
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

    if (card) {
      query = {
        ...query,
        card,
      };
    }

    const cuotas = await this.cuotaModel
      .find({ ...query, user: userId })
      .populate('card')
      .sort({ createdAt: -1 });

    return {
      cuotas,
      items: cuotas.length,
    };
  }

  async findOne(id: string, userId: string) {
    const foundCuota = await this.cuotaModel.findById(id);

    if (!foundCuota) {
      throw new Error('Cuota no encontrada');
    }

    if (foundCuota.user !== userId) {
      throw new Error('No tienes permisos para ver esta cuota');
    }

    return foundCuota;
  }

  async update(id: string, updateCuotaDto: UpdateCuotaDto, userId: string) {
    const foundCuota = await this.cuotaModel.findById(id);

    if (!foundCuota) {
      throw new Error('Cuota no encontrada');
    }

    if (foundCuota.user !== userId) {
      throw new Error('No tienes permisos para actualizar esta cuota');
    }

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

  async remove(id: string, userId: string) {
    const foundCuota = await this.cuotaModel.findById(id);

    if (!foundCuota) {
      throw new Error('Cuota no encontrada');
    }

    if (foundCuota.user !== userId) {
      throw new Error('No tienes permisos para eliminar esta cuota');
    }

    await this.cuotaModel.deleteOne({ _id: id });

    return {
      message: 'Cuota eliminada correctamente',
    };
  }
}
