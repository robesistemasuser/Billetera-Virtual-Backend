import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

export class UserRepository extends Repository<UserEntity> {
    async findByDocument(documento: string): Promise<UserEntity | undefined> {
        return this.findOne({ where: { documento } });
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.create(createUserDto);
        return this.save(user);
    }

    async findByCredentials(loginUserDto: LoginUserDto): Promise<UserEntity | undefined> {
        return this.findOne({ where: { email: loginUserDto.email, password: loginUserDto.password } });
    }
}

// Extend the repository
export const UserRepositoryFactory = (connection: any) => {
    return connection.getRepository(UserEntity).extend(UserRepository);
};
