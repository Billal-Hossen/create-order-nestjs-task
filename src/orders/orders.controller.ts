import { Controller, Post, Body, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('createOrder')
  async createOrder(@Body() orderDetails: CreateOrderDto) {
    try {
      if (!orderDetails.userId) {
        throw new HttpException({ message: 'userId is required' }, HttpStatus.BAD_REQUEST);
      }
      if (!orderDetails.productDetails) {
        throw new HttpException({ message: 'product details is required' }, HttpStatus.BAD_REQUEST);
      }

      await this.ordersService.createOrder(orderDetails);
      return { success: true, message: 'Order created successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || 'Failed to create order',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}