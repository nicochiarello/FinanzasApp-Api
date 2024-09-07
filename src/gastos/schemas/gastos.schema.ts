import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GastoDocument = HydratedDocument<Gasto>;

@Schema({
  timestamps: true,
})
export class Gasto {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
    ref: 'User',
  })
  user: string;

  @Prop({
    required: true,
  })
  value: number;
}

export const GastoSchema = SchemaFactory.createForClass(Gasto);
