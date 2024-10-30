import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import { Address } from "src/users/address.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @Column()
    status: string;

    @Column('decimal')
    total: number;

    @CreateDateColumn()
    createAt: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    items: OrderItem[];

    // delivery address
    @OneToMany(() => Address, address => address.id)
    address: Address;
}

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.items)
    order: Order;

    @ManyToOne(() => Product, product => product.id)
    product: Product;

    @Column('int')
    quantity: number;

    @Column('decimal')
    price: number;
}