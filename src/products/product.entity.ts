import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoory } from "./category.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("decimal")
    offer: number;

    @Column("decimal")
    price: number;

    @Column("text")
    description: string;

    @Column()
    sku: string;

    @Column()
    quantity: number;

    @Column("text")
    features: string;

    @Column("json")
    attachments: JSON;

    @Column("decimal")
    delivery: number;

    @Column()
    image: string;
    
    @Column()
    deliveryDuration: string;

    @ManyToOne(() => Categoory, category => category.products)
    category: Categoory;
}