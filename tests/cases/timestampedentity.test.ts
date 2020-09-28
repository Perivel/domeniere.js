import { Post } from './../artifacts/entities/post'
import { PostId } from './../artifacts/values/post-id';
import { Timestamp } from 'foundation';

test("Test the timestamped entity function defaults.", () => {
    const postId = new PostId('123');
    const content = 'Hi there';
    const postedNow = new Post(postId, content);
    expect(postedNow.id()).toEqual(postId);
    expect(postedNow.createdOn()).toBeInstanceOf(Timestamp);
    expect(postedNow.updatedOn()).toBeInstanceOf(Timestamp);
    expect(postedNow.deletedOn()).toBeNull();
});

test('Timestamped Entity functions with explicit dates.', () => {
    const postId = PostId.Generate();
    const content = "Hi there.";
    const created = new Timestamp(2020, 1, 23, 13, 0, 0, 0);
    const updated = new Timestamp(2020, 4, 1);
    const deleted = Timestamp.Now();
    const post = new Post(postId, content, created, updated, deleted);
    
    expect(post.id()).toEqual(postId);
    expect(post.createdOn()).toEqual(created);
    expect(post.updatedOn()).toEqual(updated);
    expect(post.deletedOn()).toEqual(deleted);
})