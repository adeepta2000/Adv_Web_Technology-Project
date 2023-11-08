import { IsEmail, IsNumber, IsString } from "class-validator";

export class CustomerProfileDTO{
    @IsString()
    fname: string;
    @IsString()
    lname: string;
    @IsNumber()
    customerID:number;
    @IsString() @IsEmail()
    email:string;
    @IsString()
    password:string;
    @IsString()
    country:string;
    @IsString()
    travelPreferences:string;
  }
  
  export class TourPackagesDTO{
    @IsNumber()
    tourPackageID:number;
    @IsString()
    tourName:string;
    @IsString()
    duration:string;
    @IsNumber()
    price:number;
    @IsString()
    inclusions:string;
    @IsString()
    exclusions:string;
  }
  
  export class ConfirmedBookingsDTO{
    @IsNumber()
    bookingID:number;
    @IsNumber()
    customerID:number;
    @IsNumber()
    tourPackageID:number;
    @IsString()
    departureDate:string;
    @IsString()
    returnDate:string;
    @IsNumber()
    numberOfAdults:number;
    @IsNumber()
    numberOfChildren:number;
    @IsNumber()
    totalPrice:number;
    @IsString()
    paymentStatus:string;  
  }
  
  export class PaymentsDTO{
    @IsNumber()
    paymentID: number;
    @IsNumber()
    customerID:number;
    @IsNumber()
    bookingID:number;
    @IsNumber()
    amount:number;
    @IsString()
    paymentDate:string;
    @IsString()
    paymentMethod:string;
  }