import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { GastosModule } from '../gastos/gastos.module';
import { ServiciosModule } from '../servicios/servicios.module';
import { CuotasModule } from '../cuotas/cuotas.module';

@Module({
  imports: [GastosModule, ServiciosModule, CuotasModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
