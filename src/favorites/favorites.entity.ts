import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorites {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @ManyToOne(() => Product, product => product.id)
    product: Product;
}