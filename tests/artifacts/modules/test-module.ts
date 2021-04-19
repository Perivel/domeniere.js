import { Module } from './../../../fragment';
import { PostFactory } from './../factories/post-factory';
import { DoubleNumberQuery } from './../services/double-number.query';
import { HashStringQuery, RegularHashQuery } from './../services/reverse-string.query';

export class TestModule extends Module {
    
    constructor() {
        super("testmod");
    }

    protected createdBindings(): void {
        this.addFactoryBinding(PostFactory, (container) => {
            return new PostFactory();
        });

        this.addServiceBinding(DoubleNumberQuery, (container) => {
            return new DoubleNumberQuery();
        });

        this.addServiceInstance(HashStringQuery);
    }
}

export class TestModule2 extends Module {
    
    constructor() {
        super("testmod2");
    }

    protected createdBindings(): void {
        this.addFactoryBinding(PostFactory, (container) => {
            return new PostFactory();
        });

        this.addServiceBinding(DoubleNumberQuery, (container) => {
            return new DoubleNumberQuery();
        });

        this.addServiceInstance(HashStringQuery);
    }
}