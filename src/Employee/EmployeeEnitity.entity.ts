import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
@Entity("Employee")
export class EmployeeEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
email: string;
@Column()
password: string;
}