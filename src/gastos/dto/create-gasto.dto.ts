import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGastoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
