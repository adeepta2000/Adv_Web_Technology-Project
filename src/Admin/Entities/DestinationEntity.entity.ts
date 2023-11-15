import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PackageEntity } from "./PackageEntity.entity";

@Entity("destination")
export class DestinationEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    imageUrl:string;

    @Column()
    activities:string;

    @OneToOne(() => PackageEntity, packages => packages.destination)
    package: PackageEntity; 
}