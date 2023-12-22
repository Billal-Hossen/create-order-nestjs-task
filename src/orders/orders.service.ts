import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { User } from './schema/user.schema';
import { Product } from './schema/product.schema';
import { Order } from './schema/order.schema';




@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>
  ) { }
  async createOrder(orderDetails: CreateOrderDto): Promise<{ success: boolean; message: string }> {
    try {
      const { userId, productDetails, paymentInfo } = orderDetails;


      const user = await this.userModel.findById(userId)
      if (!user) {
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      }

      const productIds = []
      orderDetails.productDetails.map(item => productIds.push(item.productId))
      const products = await this.productModel.find({ _id: { $in: productIds } })
      if (!Array.isArray(products) || products.length === 0) {
        throw new HttpException({ message: 'Product  not found' }, HttpStatus.NOT_FOUND);
      }

      // Calculate total price using product price and quantity
      const totalPrice = productDetails.reduce((total, item) => {
        const product = products.find(p => p._id.toString() === item.productId);
        if (product) {
          total += product.price * item.quantity;
        }
        return total;
      }, 0);

      const newOrderData = {
        userId,
        products: productDetails,
        totalPrice,
        paymentInfo
      }
      const order = new this.orderModel(newOrderData)
      await order.save()
      return { success: true, message: 'Order created successfully' };
    } catch (error) {
      throw error;
    }
  }
}
