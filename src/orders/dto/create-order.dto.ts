import { IsString, IsArray, IsNotEmpty, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class Product {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

class PaymentInfo {
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  expirationDate: string;

  @IsNumber()
  @IsNotEmpty()
  cvv: number;
}

export class CreateOrderDto {
  @IsString({ message: 'userId is required' })
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Product)
  productDetails: Product[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PaymentInfo)
  paymentInfo: PaymentInfo;
}