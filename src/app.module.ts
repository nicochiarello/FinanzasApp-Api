import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServiciosModule } from './servicios/servicios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { GastosModule } from './gastos/gastos.module';
import { CuotasModule } from './cuotas/cuotas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/finanzas'),
    ServiciosModule,
    TarjetasModule,
    GastosModule,
    CuotasModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
