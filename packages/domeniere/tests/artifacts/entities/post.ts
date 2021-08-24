import { TimestampedEntity } from '../../../src/entity/entity.module';
import { DateTime } from '@swindle/core';
import { PostId } from './../values/post-id';

export class Post extends TimestampedEntity {

    private _content: string;
    
    constructor(id: PostId, content: string, created: DateTime = DateTime.Now(), updated: DateTime = DateTime.Now(), deleted: DateTime|null = null) {
        super(id, created, updated, deleted);
        this._content = content;
    }

    public id(): PostId {
        return super.id() as PostId;
    }

    public content(): string {
        return this._content;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Post) {
            const other = suspect as Post;
            isEqual = this.id().equals(other.id());
        }

        return isEqual;
    }

    protected serializeData(): string {
        return JSON.stringify({
            content: this.content()
        });
    }
}