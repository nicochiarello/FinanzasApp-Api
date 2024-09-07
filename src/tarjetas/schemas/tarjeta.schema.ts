import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TarjetaDocument = HydratedDocument<Tarjeta>;

// 0 -> Visa
// 1 -> Mastercard
// 2 -> American Express

export enum Brand {
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
}

@Schema({
  timestamps: true,
})
export class Tarjeta {
  @Prop({
    required: true,
  })
  brand: Brand;

  @Prop({
    required: true,
  })
  entity: string;

  @Prop({
    required: true,
    ref: 'User',
  })
  user: string;

  @Prop({
    timestamps: true,
  })
  createdAt: Date;
}

export const TarjetaSchema = SchemaFactory.createForClass(Tarjeta);
