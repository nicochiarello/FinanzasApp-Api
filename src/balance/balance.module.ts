import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { GastosModule } from 'src/gastos/gastos.module';
import { ServiciosModule } from 'src/servicios/servicios.module';
import { CuotasModule } from 'src/cuotas/cuotas.module';

@Module({
  imports: [GastosModule, ServiciosModule, CuotasModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
