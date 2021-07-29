import { Domain } from '../../domeniere';
import { RegistrationNotFoundException } from '../../src/module/exceptions/registration-not-found.exception';
import { HashStringQuery } from '../artifacts/services/reverse-string.query';
import { ValidAPI, InvalidAPI } from './../artifacts/API/api';

test("Test the API", async () => {
    expect.assertions(3);
    const validApi = new ValidAPI();
    await validApi.initializeEvents();
    expect(validApi).toBeInstanceOf(ValidAPI);
    expect(() => new InvalidAPI()).toThrow(RegistrationNotFoundException);
    const str = await  validApi.getString();
    expect(str).toEqual("Foo");
});