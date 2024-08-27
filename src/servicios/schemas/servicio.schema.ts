import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServicioDocument = HydratedDocument<Servicio>;

@Schema({
  timestamps: true,
})
export class Servicio {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  value: number;

  @Prop({
    timestamps: true,
  })
  createdAt: Date;
}

export const ServicioSchema = SchemaFactory.createForClass(Servicio);
