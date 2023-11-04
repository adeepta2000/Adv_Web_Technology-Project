import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity("employee")
export class EmployeeEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
firstname: string;
@Column()
lastname: string;
@Column()
username: string;
@Column()
email: string;
@Column()
password: string;
@Column()
address : string;
@Column()
contact : string;
@Column()
filename:string;
}