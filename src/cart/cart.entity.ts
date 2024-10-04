import { Product } from "src/products/product.entity";
import { Address } from "src/users/address.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.carts)
    user: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    items: CartItem[];

    // relation ship with promocode.
    @Column()
    promoCode: string;

    @ManyToOne(() => Address, address => address.id)
    delivery_address: Address;

    // will be a releationship with thh payment methods.
    @Column()
    payment_method: string;
}

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cart, cart => cart.items)
    cart: Cart;

    @ManyToOne(() => Product, product => product.id)
    product: Product;

    @Column('int')
    quantity: number;
}