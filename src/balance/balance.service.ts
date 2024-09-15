import { Injectable } from '@nestjs/common';
import { GastosService } from '../gastos/gastos.service';
import { CuotasService } from '../cuotas/cuotas.service';
import { ServiciosService } from '../servicios/servicios.service';
import { Cuota } from '../cuotas/schemas/cuota.schema';
import { Gasto } from '../gastos/schemas/gastos.schema';
import { Servicio } from '../servicios/schemas/servicio.schema';

@Injectable()
export class BalanceService {
  constructor(
    private readonly gastosService: GastosService,
    private readonly cuotasService: CuotasService,
    private readonly serviciosService: ServiciosService,
  ) {}
  async getBalance(userId: string) {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    // Get all gastos mensuales from the previous 6 months
    const data = await this.getGastosMensuales(userId);

    const cuotas = await this.cuotasService.findAll(
      userId,
      currentMonth,
      currentYear,
    );

    // Get all servicios from the current month
    const servicios = await this.serviciosService.findAll(
      userId,
      currentYear,
      currentMonth,
    );

    return {
      cuotas: {
        items: cuotas.items,
        total: cuotas.cuotas.reduce(
          (acc, cuota: Cuota) => acc + cuota.value,
          0,
        ),
      },
      servicios: {
        items: servicios.items,
        total: servicios.servicios.reduce(
          (acc, servicio: Servicio) => acc + servicio.value,
          0,
        ),
      },
      gastos: data,
    };
  }

  private readonly meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Obtener el rango de meses desde el mes actual hasta 6 meses atrás
  private getUltimos7Meses() {
    const resultado = [];
    const fechaActual = new Date();

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth() - i,
        1,
      );
      const mes = fecha.getMonth();
      const año = fecha.getFullYear();

      // Agregamos el nombre del mes y el año como clave
      resultado.push({ mes, año, name: `${this.meses[mes]} ${año}` });
    }

    return resultado.reverse(); // Ordenar para que el mes más antiguo sea el primero
  }

  // Filtrar y agrupar los gastos de los últimos 7 meses
  async getGastosMensuales(userId: string) {
    // Llamada al método findAll para obtener los gastos
    const data = await this.gastosService.findAll(userId, null, null);
    const { gastos } = data;

    // Obtener los últimos 7 meses (del actual hacia atrás)
    const ultimos7Meses = this.getUltimos7Meses();

    // Filtrar los gastos que pertenecen a los últimos 7 meses
    const gastosFiltrados = gastos.filter((gasto: Gasto) => {
      const fechaGasto = new Date(gasto.createdAt);
      return ultimos7Meses.some(
        (mesInfo) =>
          fechaGasto.getMonth() === mesInfo.mes &&
          fechaGasto.getFullYear() === mesInfo.año,
      );
    });

    // Agrupar los gastos por mes
    const gastosPorMes = gastosFiltrados.reduce((acc, gasto: Gasto) => {
      const fecha = new Date(gasto.createdAt);
      const mes = fecha.getMonth(); // Esto devolverá un número entre 0 y 11
      const año = fecha.getFullYear();

      // Asegurarse de crear una clave clara para cada mes
      const claveMes = `${mes}-${año}`;

      // Inicializar el valor de gastos para este mes si no existe
      if (!acc[claveMes]) {
        acc[claveMes] = 0;
      }

      // Convertir el valor a número y sumarlo
      acc[claveMes] += Number(gasto.value);

      return acc;
    }, {});

    // Crear el resultado, asegurándonos de que todos los meses (incluso sin gastos) estén presentes
    const resultado = ultimos7Meses.map((mesInfo) => ({
      name: mesInfo.name, // Nombre del mes (Enero, Febrero...)
      value: gastosPorMes[`${mesInfo.mes}-${mesInfo.año}`] || 0, // Valor total de los gastos
    }));

    return resultado;
  }
}
