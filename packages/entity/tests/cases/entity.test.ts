import { User } from './../artifacts/entities/user';
import { Name } from './../artifacts/values/name.value';
import { UserId } from './../artifacts/values/user-id';

test('Test the entity basic functions.', () => {

    const name = new Name("John", "Doe");
    const id = new UserId('123');
    const user = new User(id, name);
    expect(user.id().id()).toEqual('123');
});