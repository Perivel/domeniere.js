import { Module } from './../../../fragment';
import { PostFactory } from './../factories/post-factory';
import { DoubleNumberQuery } from './../services/double-number.query';
import { HashStringQuery, RegularHashQuery } from './../services/reverse-string.query';

export class TestModule extends Module {
    
    constructor() {
        super("testmod");
    }

    protected createdBindings(): void {
        this.bindFactory(PostFactory, (container) => {
            return new PostFactory();
        });

        this.bindService(DoubleNumberQuery, (container) => {
            return new DoubleNumberQuery();
        });

        this.bindServiceInstance(HashStringQuery);
    }
}

export class TestModule2 extends Module {
    
    constructor() {
        super("anothermod");
    }

    protected createdBindings(): void {
        this.bindFactory(PostFactory, (container) => {
            return new PostFactory();
        });

        this.bindService(DoubleNumberQuery, (container) => {
            return new DoubleNumberQuery();
        });

        this.bindServiceInstance(HashStringQuery);
    }
}