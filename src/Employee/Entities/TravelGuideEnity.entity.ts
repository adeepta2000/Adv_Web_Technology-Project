import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("travelguide")
export class TravelGuide{
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
}