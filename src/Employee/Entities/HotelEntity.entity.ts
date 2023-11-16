import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeEntity } from "./EmployeeEntity.entity";



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

        @ManyToOne(() => EmployeeEntity, employee => employee.hotels)
        employee: EmployeeEntity;
        }
