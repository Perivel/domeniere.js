import { DrinkingAgeSpecification } from './../artifacts/specs/drinking-age.specification'
import { LegalAgeSpecification } from './../artifacts/specs/legal-age.specification';

test('Specification passes as a single unit.', () => {
    const legalAgeSpec = new LegalAgeSpecification();
    expect(legalAgeSpec.isSatisfiedBy(18)).toEqual(true);

    const drinkingAgeSpec = new DrinkingAgeSpecification();
    expect(drinkingAgeSpec.isSatisfiedBy(21)).toEqual(true); 
});