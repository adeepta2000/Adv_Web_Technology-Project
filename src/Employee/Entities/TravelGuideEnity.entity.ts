import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeEntity } from "./EmployeeEntity.entity";
import { PackageEntity } from "src/Admin/Entities/PackageEntity.entity";




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
    GuideName: string;
    @Column()
    GuideContact : string;
    @Column()
    PackageName : string;
    @Column()
    Price : string;

    @ManyToOne(() => EmployeeEntity, employee => employee.travelGuides)
    @JoinColumn({ name: "GuideID" }) 
    guide: EmployeeEntity;

    @OneToOne(() => PackageEntity, packageEntity => packageEntity.travelGuide)
    package: PackageEntity;
}