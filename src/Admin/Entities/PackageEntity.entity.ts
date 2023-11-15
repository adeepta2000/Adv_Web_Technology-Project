import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DestinationEntity } from "./DestinationEntity.entity";

@Entity("package")
export class PackageEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    price:string;

    @Column()
    discount:string;

    @Column()
    duration:string;

    @OneToOne(() => DestinationEntity, destination => destination.package, { cascade: true }) 
    @JoinColumn({ name: 'destinationId' })
    destination: DestinationEntity;

}