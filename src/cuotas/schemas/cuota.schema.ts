import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CuotaDocument = HydratedDocument<Cuota>;

@Schema({
  timestamps: true,
})
export class Cuota {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  value: number;

  @Prop({
    required: true,
  })
  paid: number;

  @Prop({
    required: true,
  })
  qty: number;

  @Prop({
    required: true,
    ref: 'Tarjeta',
  })
  card: string;
}

export const CuotaSchema = SchemaFactory.createForClass(Cuota);
