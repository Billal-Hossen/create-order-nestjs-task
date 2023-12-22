import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Product, ProductSchema } from './schema/product.schema';
import { Order, OrderSchema } from './schema/order.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Product.name, schema: ProductSchema }, { name: Order.name, schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
