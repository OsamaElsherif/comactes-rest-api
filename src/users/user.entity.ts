import { Cart } from 'src/cart/cart.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { Notification } from 'src/notifications/notification.entity';
import { Order } from 'src/orders/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // email or username is accepted
  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: number;

  @Column()
  address: string;

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