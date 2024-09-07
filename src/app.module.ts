import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServiciosModule } from './servicios/servicios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { GastosModule } from './gastos/gastos.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/finanzas'),
    ServiciosModule,
    TarjetasModule,
    GastosModule,
    CuotasModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
