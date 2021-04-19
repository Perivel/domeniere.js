import { Name } from './../artifacts/values/name.value';

test('Test the name value', () => {
    const john = new Name('John', 'Doe');
    const susi = new Name('Susi', 'Sue');

    expect(john.first()).toEqual('John');
    expect(john.last()).toEqual('Doe');
    expect(john.equals(john)).toEqual(true);
    expect(john.equals(susi)).toEqual(false);
})