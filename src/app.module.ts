import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServiciosModule } from './servicios/servicios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { GastosModule } from './gastos/gastos.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
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
