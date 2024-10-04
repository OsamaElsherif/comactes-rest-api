import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { createAddressDto } from './dto/create-address.dto';
import { Address } from './address.entity';
import { UpdateAdderssDto } from './dto/update-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private readonly mailerService: MailerService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, address, phoneNumber, workType, companyType, employeesNumber, jobTitle } = createUserDto;
    const user = this.usersRepository.create({ email, username, phoneNumber, workType, companyType, employeesNumber, jobTitle });
    
    await this.usersRepository.save(user);
    await this.addAddress(address, user);

    return user;
  }

  async addAddress(createAddressDto: createAddressDto, user: User): Promise<Address> {
    const { ...addressInfo } = createAddressDto;
    const address = this.addressRepository.create({...addressInfo, user});
    const result = await this.addressRepository.save(address);
    return result;
  }

  async updateAddress(updateAddressDto: UpdateAdderssDto, user: User, id: number): Promise<Address> {
    const { ...addressInfo } = updateAddressDto;
    const address = await this.addressRepository.update(id, {...addressInfo, user});
    return await this.addressRepository.findOne({where: {id: id}});
  }
  
  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({where: {id: id}, relations: ['addresses']});
  }

  async activate(email: string): Promise<void> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      return null
    }

    const rand_password = Math.random().toString(36).slice(-8);

    this.mailerService.sendMail({
      from: "Comactes ECommerce <noreplay@comactes.com>",
      to: user.email,
      subject: "Account Activation - Password",
      text: `You account has been activated and approved by comactes admins, you credintails \n
              Email: ${user.email} \n
              Password: ${rand_password} \n
              \n
              if there is any problems please contact our support team. \n
              don't replay on this email, this is a no-replay email.`
    });

    await this.usersRepository.update(user.id, { static: true, password: rand_password})
  }

  async findAll(body): Promise<any> {
    return this.usersRepository.find({where: body});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { email, username, phoneNumber, password,  workType, companyType, employeesNumber, jobTitle} = updateUserDto;
    await this.usersRepository.update(id, { ...(password && { password }), 
                                            ...(email && { email }),
                                            ...(username && { username }),
                                            ...(phoneNumber && {phoneNumber}), 
                                            ...(workType && {workType}),
                                            ...(companyType && {companyType}),
                                            ...(employeesNumber && {employeesNumber}),
                                            ...(jobTitle && {jobTitle}),});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}