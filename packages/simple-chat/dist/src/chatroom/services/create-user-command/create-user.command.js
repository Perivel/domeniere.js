"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserCommand = void 0;
const service_1 = require("@domeniere/service");
const chatroom_module_1 = require("../../chatroom.module");
class CreateUserCommand extends service_1.Command {
    constructor(factory, repository) {
        super();
        this.usrFactory = factory;
        this.userRepository = repository;
    }
    async execute(registration) {
        const id = this.userRepository.generateIdentity();
        const user = this.usrFactory.createFromRaw(id.id(), registration.username().first(), registration.username().last(), registration.nickname() ? registration.nickname().value() : "");
        try {
            await this.userRepository.save(user);
            await this.emit(new chatroom_module_1.UserCreated(user));
        }
        catch (e) {
            throw e;
        }
    }
}
exports.CreateUserCommand = CreateUserCommand;
