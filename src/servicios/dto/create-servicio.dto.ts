import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
