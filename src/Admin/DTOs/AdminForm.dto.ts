import { Equals, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class AdminForm{
    @IsInt()
    @IsNumber()
    id:number;

    @IsString()
    FirstName: string;

    @IsString()
    LastName: string;

    //@Equals("FirstName", { message: "Firstname do not match with username" })
    @IsNotEmpty()
    Username: string;
    
    @IsEmail()
    Email: string;
    Address: string;

    @Matches(/^[a-zA-Z]*[a-z][a-zA-Z\d]*[A-Z][a-zA-Z\d]*\d[a-zA-Z\d]*$/, { message: "Password must contain one lowercase letter, one uppercase letter and one digit"})
    Password: string;

}