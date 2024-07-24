import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, phoneNumber, address, workType, companyType, employeesNumber, jobTitle } = createUserDto;
    const user = this.usersRepository.create({ email, phoneNumber, address, workType, companyType, employeesNumber, jobTitle });
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id: id}});
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
    const { email, phoneNumber, password,  workType, companyType, employeesNumber, address, jobTitle} = updateUserDto;
    await this.usersRepository.update(id, { ...(password && { password }), 
                                            ...(email && { email }),
                                            ...(phoneNumber && {phoneNumber}), 
                                            ...(workType && {workType}),
                                            ...(companyType && {companyType}),
                                            ...(employeesNumber && {employeesNumber}),
                                            ...(address && {address}),
                                            ...(jobTitle && {jobTitle}),});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}