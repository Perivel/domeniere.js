import { TimestampedEntity } from '../../../index';
import { DateTime } from '@swindle/core';
import { PostId } from './../values/post-id';

export class Post extends TimestampedEntity {
    
    constructor(id: PostId, content: string, created: DateTime = DateTime.Now(), updated: DateTime = DateTime.Now(), deleted: DateTime|null = null) {
        super(id, created, updated, deleted);
        this.__state__.initialize("content", content);
    }

    public id(): PostId {
        return super.id() as PostId;
    }

    public content(): string {
        return this.__state__.get("content");
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

    public updateContent(content: string): void {
        this.__state__.set("content", content);
        this.commitStateChanges();
    }
}