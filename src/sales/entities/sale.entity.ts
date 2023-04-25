import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, HydratedDocument, SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'orders' })
export class Sale {
  @Prop({ type: SchemaTypes.ObjectId })
  productId: Types.ObjectId;

  @Prop()
  productName: string;

  @Prop()
  orderDate: Date;

  @Prop()
  price: number;
}

export type SalesDocument = HydratedDocument<Sale>;
export const SaleSchema = SchemaFactory.createForClass(Sale);
