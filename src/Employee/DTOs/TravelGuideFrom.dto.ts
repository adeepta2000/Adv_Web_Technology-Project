import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class HotelForm{

    @IsNotEmpty()
    DestinationName: string;

    @IsString()
    Location: string;
    
    Description: string;
    
    @IsString()
    GuideName: string;

    address: string;

    @IsNumber()
    GuideContact : string;

    @IsString()
    PackageName : string;
    
    @IsString()
    Price: string;

}
