import { DrinkingAgeSpecification } from './../artifacts/specs/drinking-age.specification'
import { LegalAgeSpecification } from './../artifacts/specs/legal-age.specification';

test('Specification passes as a single unit.', () => {
    const legalAgeSpec = new LegalAgeSpecification();
    expect(legalAgeSpec.isSatisfiedBy(18)).toEqual(true);

    const drinkingAgeSpec = new DrinkingAgeSpecification();
    expect(drinkingAgeSpec.isSatisfiedBy(21)).toEqual(true); 
});

test('Specification AND operator', () => {
    const legalAgeSpec = new LegalAgeSpecification();
    const drinkingAgeSpec = new DrinkingAgeSpecification();

    expect(legalAgeSpec.and(drinkingAgeSpec).isSatisfiedBy(33)).toEqual(true);
    expect(legalAgeSpec.and(drinkingAgeSpec).isSatisfiedBy(18)).toEqual(false);
    expect(legalAgeSpec.and(drinkingAgeSpec).isSatisfiedBy(15)).toEqual(false);
});

test('Specification OR operator', () => {
    const legalAgeSpec = new LegalAgeSpecification();
    const drinkingAgeSpec = new DrinkingAgeSpecification();

    expect(legalAgeSpec.or(drinkingAgeSpec).isSatisfiedBy(33)).toEqual(true);
    expect(legalAgeSpec.or(drinkingAgeSpec).isSatisfiedBy(19)).toEqual(true);
    expect(legalAgeSpec.or(drinkingAgeSpec).isSatisfiedBy(12)).toEqual(false);
});

test('Specification AndNot operator', () => {
    const legalAgeSpec = new LegalAgeSpecification();
    const drinkingAgeSpec = new DrinkingAgeSpecification();

    expect(legalAgeSpec.andNot(drinkingAgeSpec).isSatisfiedBy(33)).toEqual(false);
    expect(legalAgeSpec.andNot(drinkingAgeSpec).isSatisfiedBy(12)).toEqual(false);
    expect(legalAgeSpec.andNot(drinkingAgeSpec).isSatisfiedBy(19)).toEqual(true);
});

test('Specification ORNOT operator.', () => {
    const legalAgeSpec = new LegalAgeSpecification();
    const drinkingAgeSpec = new DrinkingAgeSpecification();

    expect(legalAgeSpec.orNot(drinkingAgeSpec).isSatisfiedBy(10)).toEqual(true);
    expect(legalAgeSpec.orNot(drinkingAgeSpec).isSatisfiedBy(18)).toEqual(true);
    expect(legalAgeSpec.orNot(drinkingAgeSpec).isSatisfiedBy(33)).toEqual(true);
});