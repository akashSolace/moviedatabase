import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password: _, ...result } = user.toObject();
      return result as UserDocument;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, sub: user._id.toString() };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async register(createUserDto: { email: string; password: string; name: string }) {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }
    
    const user = await this.usersService.create(createUserDto);
    return this.login(user);
  }
}
