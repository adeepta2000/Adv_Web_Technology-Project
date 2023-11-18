import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Unique, JoinColumn, ManyToMany, OneToOne } from "typeorm";

@Entity("agent")
export class agentEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
@Unique(["email"])
email: string;
@Column()
password: string;
@Column({nullable: true})
file:string;
@Column({nullable: true}) 
contact: string;
@OneToMany(() => agenttourPackagesEntity, (tourPackage) => tourPackage.agent, { cascade:true, onDelete:"CASCADE"})
tourPackages: agenttourPackagesEntity[];
@OneToOne(() => SupportEntity, (support)=> support.agent,{cascade:true, onDelete:"CASCADE"})
support: SupportEntity[];
}

@Entity("Tour_Packages")
export class agenttourPackagesEntity{
@PrimaryGeneratedColumn()
tour_id:number;
@Column()
creator_id:number;
@Column()
from:string;
@Column()
destination:string;
@Column()
distance:string;
@Column()
price:number;
@Column()
transport:string;
@Column()
weather_Info:string;
@Column()
availability:string;
@ManyToOne(() => agentEntity, (agent) => agent.tourPackages, {onDelete:"CASCADE"})
@JoinColumn({ name: "creator_id" })
agent: agentEntity;
@ManyToMany(() => agentbookingsEntity, (bookings) => bookings.tourbookings, { cascade:true, onDelete:"CASCADE"})
bookings:agentbookingsEntity[];
}

@Entity("Bookings")
export class agentbookingsEntity{
    @PrimaryGeneratedColumn()
    booking_number:number;
    @Column()
    tour_id:number;
    @Column()
    tourist_id:number;
    @Column()
    date:Date;
    @Column()
    total_cost:number;
    @Column()
    person:number;
    @ManyToMany(() =>agenttourPackagesEntity, (tourbookings) => tourbookings.bookings,{onDelete:"CASCADE"})
    tourbookings:agenttourPackagesEntity[];

}

@Entity("Support")
export class SupportEntity {
    @PrimaryGeneratedColumn()
    booking_id: number;
    @Column()
    creator_id: number;
    @Column()
    complaint: string;
    @Column()
    resolution: string;
    

    @OneToOne(() => agentEntity,(agent)=> agent.support,{onDelete:"CASCADE"})
    @JoinColumn({ name: "creator_id" })
    agent: agentEntity[];

}
