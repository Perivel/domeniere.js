import { Domain } from '../../fragment';
import { RegistrationNotFoundException } from '../../src/module/exceptions/registration-not-found.exception';
import { HashStringQuery } from '../artifacts/services/reverse-string.query';
import { ValidAPI, InvalidAPI } from './../artifacts/API/api';

test("Test the API", async () => {
    expect.assertions(3);
    expect(new ValidAPI()).toBeInstanceOf(ValidAPI);
    expect(() => new InvalidAPI()).toThrow(RegistrationNotFoundException);
    const api = new ValidAPI();
    const str = await  api.getString();
    expect(str).toEqual("Foo");
});