
import { DependencyNotFoundException } from 'verdic';
import { DoubleNumberQuery } from '../artifacts/services/double-number.query';
import { Domain } from './../../src/domain/domain.module';

test("Domain should be empty", () => {
    expect(Domain.Module().has(DoubleNumberQuery)).toEqual(false);
    expect(() => Domain.Module().get(DoubleNumberQuery)).toThrow(DependencyNotFoundException);
});

test("Add service to the Domain.", async () => {
    expect.assertions(3);
    Domain.Module().bindInstance(DoubleNumberQuery, new DoubleNumberQuery());
    expect(Domain.Module().has(DoubleNumberQuery)).toEqual(true);
    expect(Domain.Module().get(DoubleNumberQuery)).toBeInstanceOf(DoubleNumberQuery);
    const double = await Domain.Module().get(DoubleNumberQuery).execute(2);
    expect(double).toEqual(4);
});


