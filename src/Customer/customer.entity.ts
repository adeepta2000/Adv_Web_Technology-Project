import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("customer")
export class CustomerProfileEntity{
    @PrimaryGeneratedColumn()
    customerID:number;
    @Column()
    fname: string;
    @Column()
    lname: string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    country:string;
    @Column()
    travelPreferences:string;
  }
  @Entity("customerPackage")
  export class TourPackagesEntity{
    @PrimaryGeneratedColumn()
    tourPackageID:number;
    @Column()
    dourName:string;
    @Column()
    duration:string;
    @Column()
    price:number;
    @Column()
    inclusions:string;
    @Column()
    exclusions:string;
  }
  @Entity("customerBooking")
  export class ConfirmedBookingsEntity{
    @PrimaryGeneratedColumn()
    bookingID:number;
    @Column()
    customerID:number;
    @Column()
    tourPackageID:number;
    @Column()
    departureDate:string;
    @Column()
    returnDate:string;
    @Column()
    numberOfAdults:number;
    @Column()
    numberOfChildren:number;
    @Column()
    totalPrice:number;
    @Column()
    paymentStatus:string;  
  }
  @Entity("customerPayment")
  export class PaymentsEntity{
    @PrimaryGeneratedColumn()
    paymentID: number;
    @Column()
    customerID:number;
    @Column()
    bookingID:number;
    @Column()
    amount:number;
    @Column()
    paymentDate:string;
    @Column()
    paymentMethod:string;
  }