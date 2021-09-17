import { Query } from '@domeniere/service';
import { MethodUndefinedException } from '@swindle/core';
import { Nickname, User, UserRepository } from '../../chatroom.module';


export class GetUserByNicknameQuery extends Query {

    private readonly userRepository: UserRepository;

    constructor(repository: UserRepository) {
        super();
        this.userRepository = repository;
    }

    public async execute(nickname: Nickname): Promise<User> {
        
        try {
            return await this.userRepository.getByNickname(nickname);
        }
        catch(e) {
            throw e;
        }
    }
}