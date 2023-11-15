import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("hotel")
export class HotelEntity{
    
        @PrimaryGeneratedColumn()
        Id: number;
        @Column()
        HotelName: string;
        @Column()
        Location: string;
        @Column()
        Rating: string;
        @Column()
        PriceRange: string;
        @Column()
        Contact: string;
        @Column()
        address : string;
        @Column()
        Description : string;


        }
