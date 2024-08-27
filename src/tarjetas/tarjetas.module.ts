import { Module } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { TarjetasController } from './tarjetas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarjeta, TarjetaSchema } from './schemas/tarjeta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarjeta.name, schema: TarjetaSchema }]),
  ],
  controllers: [TarjetasController],
  providers: [TarjetasService],
})
export class TarjetasModule {}
