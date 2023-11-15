import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class HotelForm{

    @IsNotEmpty()
    HotelName: string;

    @IsString()
    Location: string;

    @IsNumber()
    Rating: string;
    
    @IsString()
    PriceRange: string;

    address: string;

    Description: string;

    @IsNumber()
    contact : string;
}
