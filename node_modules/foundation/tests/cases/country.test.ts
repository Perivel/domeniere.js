import { Country, CountryException } from './../../src/geography/geography.module';

test("Creating a valid country", () => {
    expect(new Country("US")).toBeDefined();
});

test("Instanciating a a country with invalid parameters should throw an exception", () => {
    expect(() => new Country("")).toThrow(CountryException);
    expect(() => new Country("XX")).toThrow(CountryException);
});