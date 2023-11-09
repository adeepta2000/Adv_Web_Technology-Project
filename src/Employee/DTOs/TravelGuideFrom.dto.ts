import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class HotelForm{

    @IsNotEmpty()
    DestinationName: string;

    @IsString()
    Location: string;
    
    Description: string;


    @IsInt()
    GuideID: string;
    
    @IsString()
    GuideName: string;

    address: string;

    @IsNumber()
    GuideContact : string;

    @IsInt()
    PackageID: string;

    @IsString()
    PackageName : string;
    
    @IsString()
    Price: string;

}
