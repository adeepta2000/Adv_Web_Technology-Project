import { Equals, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class AdminForm{

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    //@Equals("FirstName", { message: "Firstname do not match with username" })
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string;

    address: string;

    //@Matches(/^[a-zA-Z]*[a-z][a-zA-Z\d]*[A-Z][a-zA-Z\d]*\d[a-zA-Z\d]*$/, { message: "Password must contain one lowercase letter, one uppercase letter and one digit"})
    password: string;

    filename:string;

}


export class AdminUpdateInfo{

    FirstName:string;
    LastName: string;
    Username:string;
    Email: string;
    Address:string;
    Password:string;
   
    }