import { Controller, Post, Body, Get, Patch, Delete, UseGuards, Req, UnauthorizedException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { IUserRequest } from 'src/interfaces/IUserRequest.i'; 
import { AuthService } from '../auth/auth.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { createAddressDto } from './dto/create-address.dto';
import { UpdateAdderssDto } from './dto/update-address.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // getting all users by admins
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("allUsers")
  async getAllUsers(@Body() body: { address?: string, workType?: string, companyType?: string, employeesNumber?: string, jobTitle?: string, role?: string, static?: string }, @Req() req: IUserRequest) {
    const user = req.user;
    return this.usersService.findAll(body);
  }

  // ativating user by admins
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("activate")
  async activateUser(@Body() body: { email: string }, @Req() req: IUserRequest ) {
    const user = req.user;
    this.usersService.activate(body.email);
    return { "user": body.email, "static": true }
  }

  // get user profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: IUserRequest) {
    return this.usersService.findOneById(req.user.id);
  }

  // update user data
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Req() req: IUserRequest, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    await this.usersService.update(user.id, updateUserDto);
    return this.usersService.findOneByEmail(user.email);
  }

  // adding a new address for a user
  @UseGuards(JwtAuthGuard)
  @Post("/profile/address/add")
  async addAddress(@Req() req: IUserRequest, @Body() createAddressDto: createAddressDto) {
    const user = req.user;
    return this.usersService.addAddress(createAddressDto, user);
  }

  // updating an address for the user
  @UseGuards(JwtAuthGuard)
  @Patch("/profile/address/updae/:id")
  async updateAddress(@Param('id') id: number, @Req() req: IUserRequest, @Body() updateAddressDto: UpdateAdderssDto) {
    const user = req.user;
    return this.usersService.updateAddress(updateAddressDto, user, id);
  }
  
  // forgot password - bug
  @Patch('password/forgot')
  async forgotPassword(@Body() body: {email: string, password: string}) {
    let updateUserDto: UpdateUserDto;
    updateUserDto.password = body.password;
    const user = await this.usersService.findOneByEmail(body.email);
    await this.usersService.update(user.id, updateUserDto);

    return {message: 'Password changed successfully'};
  }
  
  // delete user
  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteProfile(@Req() req: IUserRequest) {
    const user = req.user;
    await this.usersService.remove(user.id);
  }
}