import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    address_line: string;

    @ManyToOne(() => User, user => user.addresses, { cascade: true, eager: true})
    @JoinColumn()
    user: User;
}