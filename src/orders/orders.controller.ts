import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('createOrder')
  async createOrder(@Body() orderDetails: CreateOrderDto) {
    try {
      const { userId, productDetails, paymentInfo } = orderDetails;
      // validate userId, productDetails,  paymentInfo 
      if (!userId || !productDetails || !paymentInfo) {
        throw new HttpException({ message: 'Please provide valid userId, productDetails, and paymentInfo' }, HttpStatus.BAD_REQUEST);
      }
      //validate productDetails array and not empty
      if (!Array.isArray(productDetails) || productDetails.length === 0) {
        throw new HttpException({ message: 'Products should be a non-empty array' }, HttpStatus.BAD_REQUEST);
      }
      //validate productId and quantity is not null or empty
      for (const product of productDetails) {
        if (!product.productId || !product.quantity) {
          throw new HttpException({ message: 'Each product should have productId and quantity' }, HttpStatus.BAD_REQUEST);

        }
      }
      // validate paymentInfo properties type
      if (
        typeof paymentInfo !== 'object' ||
        typeof paymentInfo.method !== 'string' ||
        typeof paymentInfo.cardNumber !== 'string' ||
        typeof paymentInfo.expirationDate !== 'string' ||
        typeof paymentInfo.cardHolderName !== 'string' ||
        typeof paymentInfo.cvv !== 'number' ||
        typeof paymentInfo.billingAddress !== 'object'
      ) {
        throw new HttpException({ message: 'Invalid paymentInfo structure' }, HttpStatus.BAD_REQUEST);
      }

      const { billingAddress } = paymentInfo
      // validate billingAddress properties type
      if (
        typeof billingAddress !== 'object' ||
        typeof billingAddress.city !== 'string' ||
        typeof billingAddress.city !== 'string' ||
        typeof billingAddress.state !== 'string' ||
        typeof billingAddress.postalCode !== 'string' ||
        typeof billingAddress.country !== 'string'
      ) {
        throw new HttpException({ message: 'Invalid billingAddress structuree' }, HttpStatus.BAD_REQUEST);
      }

      return await this.ordersService.createOrder(orderDetails);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || 'Order creation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}