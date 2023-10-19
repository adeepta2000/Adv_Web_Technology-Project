import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class AdminEntity {

@PrimaryGeneratedColumn()
id: number;

@Column()
firstName: string;

@Column()
lastName:string;

@Column()
username:string;

@Column()
email: string;

@Column()
address: string;

@Column()
password: string;

@Column()
filename: string;

}
