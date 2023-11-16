import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeEntity } from "./EmployeeEntity.entity";




@Entity("travelguide")
export class TravelGuideEntity{
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    DestinationName: string;
    @Column()
    Location: string;
    @Column()
    Description: string;
    @Column()
    GuideID: number;
    @Column()
    GuideName: string;
    @Column()
    GuideContact : string;
    @Column()
    PackageID : number;
    @Column()
    PackageName : string;
    @Column()
    Price : string;

    @ManyToOne(() => EmployeeEntity, employee => employee.travelGuides)
    @JoinColumn({ name: "GuideID" }) 
    guide: EmployeeEntity;
}