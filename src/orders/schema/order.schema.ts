import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop([
    {
      productId: { type: MongooseSchema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
    },
  ])
  products: { productId: string; quantity: number }[];

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({
    method: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expirationDate: { type: String, required: true },
    cvv: { type: Number, required: true },
    billingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  })
  paymentInfo: MongooseSchema.Types.Mixed;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);