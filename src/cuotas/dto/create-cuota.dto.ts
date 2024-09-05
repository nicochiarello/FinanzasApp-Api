import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCuotaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  paid: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsString()
  @IsNotEmpty()
  card: string;

  @IsOptional()
  createdAt: Date;
}
