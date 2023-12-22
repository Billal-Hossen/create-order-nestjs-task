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

class BillingAddress {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string
}



class PaymentInfo {
  @IsString()
  @IsNotEmpty()
  method: string;

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

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BillingAddress)
  billingAddress: BillingAddress;
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