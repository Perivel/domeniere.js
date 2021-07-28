
import { DependencyNotFoundException, InvalidModuleException, ModuleNotFoundException } from 'verdic';
import { DoubleNumberQuery } from '../artifacts/services/double-number.query';
import { PostFactory } from './../artifacts/factories/post-factory';
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

test("Test the factory module", () => {
    //expect(Domain.Factory().has(PostFactory)).toEqual(false);
    Domain.CreateModule('posts');
    // Domain.Factory("posts").bind(PostFactory, (_) => {
    //     return new PostFactory();
    // });
    // expect(Domain.Factory().has(PostFactory)).toEqual(false);
    // expect(() => Domain.Factory('users').has(PostFactory)).toThrow(ModuleNotFoundException);
    // expect(() => Domain.Factory('users&&').has(PostFactory)).toThrow(InvalidModuleException);
    // expect(Domain.Factory('posts').has(PostFactory)).toEqual(true);
    // expect(Domain.Repository('posts').has(PostFactory)).toEqual(false);
    // expect(Domain.Service('posts').has(PostFactory)).toEqual(false);
});


