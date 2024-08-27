import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { Gasto, GastoSchema } from './schemas/gastos.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Gasto.name,
        schema: GastoSchema,
      },
    ]),
  ],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule {}
