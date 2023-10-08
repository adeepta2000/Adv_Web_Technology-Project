import { Module } from "@nestjs/common";
import { AdminController } from "./AdminController.controller";

@Module({
imports:[],
controllers:[AdminController],
providers:[]
})
export class AdminModule{}