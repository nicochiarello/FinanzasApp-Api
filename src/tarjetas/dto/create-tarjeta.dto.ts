import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Brand } from '../schemas/tarjeta.schema';

export class CreateTarjetaDto {
  @IsNumber()
  @IsNotEmpty()
  brand: Brand;

  @IsString()
  @IsNotEmpty()
  entity: string;
}
