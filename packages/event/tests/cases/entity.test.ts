import { User } from './../artifacts/entities/user';
import { Name } from './../artifacts/values/name.value';
import { UserId } from './../artifacts/values/user-id';
import { Post } from "./../artifacts/entities/post";
import { PostId } from '../artifacts/values/post-id';

test('Getting and setting entity properties.', () => {
    const id = ";akso;dsmk"
    const fName = "Ross";
    const lName = "Boss";
    const user = new User(
        new UserId(id),
        new Name(fName, lName)
    );

    expect(user.id().id()).toEqual(id);
    expect(user.name().first()).toEqual(fName);
    expect(user.name().last()).toEqual(lName);

    // create a second user
    const id2 = "asferaedv";
    const fName2 ="Sally";
    const lName2 = "May";
    const user2 = new User(
        new UserId(id2),
        new Name(fName2, lName2)
    );

    expect(user.equals(user)).toBeTruthy();
    expect(user.equals(user2)).toBeFalsy();

    // test the updating the name.
    const newName = new Name(fName2, lName2);
    user.updateName(newName);
    expect(user.name()).toEqual(newName);

    // test confirming the state change.
    user.confirmStateChanges();
    expect(user.name()).toEqual(newName);

    // test rollbacking changes
    const originalName = new Name(fName, lName2);
    user.updateName(originalName);
    expect(user.name()).toEqual(originalName);
    user.rollbackStateChanges();
    expect(user.name()).toEqual(newName);
});

test("Getting and setting Timestamped Entity properties", () => {
    // create a post
    const postId = new PostId("dskfaksmklas");
    const content = "This is some post content.";
    const post = new Post(
        postId,
        content
    );

    // test post properties.
    const createdOn = post.createdOn();
    const deletedOn = post.deletedOn();

    expect(post.id()).toEqual(postId);
    expect(post.content()).toEqual(content);

    // update and confirm state changes.
    const newContent = "FoooDDD";
    post.updateContent(newContent);
    let updateDate = post.updatedOn();
    expect(post.content()).toEqual(newContent);
    expect(post.createdOn()).toEqual(createdOn);
    expect(post.updatedOn()).toEqual(updateDate);
    expect(post.deletedOn()).toEqual(deletedOn);

    post.confirmStateChanges();
    expect(post.content()).toEqual(newContent);
    expect(post.createdOn()).toEqual(createdOn);
    expect(post.updatedOn()).toEqual(updateDate);
    expect(post.deletedOn()).toEqual(deletedOn);

    // update and rollback state changes.
    const baseUpdatedOn = post.updatedOn();
    post.updateContent(content);
    updateDate = post.updatedOn();
    expect(post.content()).toEqual(content);
    post.rollbackStateChanges();
    expect(post.content()).toEqual(newContent);
    expect(post.updatedOn()).toEqual(baseUpdatedOn);
});