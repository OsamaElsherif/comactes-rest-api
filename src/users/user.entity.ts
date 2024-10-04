import { Cart } from 'src/cart/cart.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { Notification } from 'src/notifications/notification.entity';
import { Order } from 'src/orders/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // email
  @Column({ unique: true })
  email: string;

  // username
  @Column({ unique: true })
  username: string;

  @Column()
  phoneNumber: number;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  // should be a value from worktype table
  @Column()
  workType: string;

  // should be a value from companytype table
  @Column()
  companyType: string;

  // should be a value from the rangesOfEmployees table
  @Column()
  employeesNumber: string;

  // should be a value from the jobTitles table
  @Column()
  jobTitle: string;

  @Column({ default: '' })
  password: string;

  // Admin, User, Seller, Supplier
  @Column({ default: 'User' })
  role: string;

  @Column({ default: '' })
  profile: string;

  @OneToMany(() => Order, order => order.id)
  orders: Order;

  @OneToMany(() => Cart, cart => cart.id)
  carts: Cart[];

  @OneToMany(() => Notification, notification => notification.id)
  notifications: Notification[];

  @OneToMany(() => Favorites, favorites => favorites.id)
  favorites: Favorites[];

  // activated after the admin aproves the request
  @Column({ default: false })
  static: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}