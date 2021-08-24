import { Post } from '../entities/post';
import { PostId } from '../values/post-id';
import { AbstractFactory } from './../../../src/factory/abstract-factory/abstract-factory';

export class PostFactory extends AbstractFactory {

    constructor() {
        super();
    }

    public createFromRaw(id: string, content: string): Post {
        return new Post(PostId.Generate(), content);
    }
}