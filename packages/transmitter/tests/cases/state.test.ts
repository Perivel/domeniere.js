import {
    State,
    DuplicateStateInitializationException,
    UndefinedStateException
} from "./../../index";

class User {
    public name: string;
    public age: number;
    public id: string;

    constructor(id: string, name: string, age: number) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

test("Storing and retrieving values in state", () => {
    const state = new State();
    const objkey = "user";
    const simplekey = "version";

    // ensure state throws correct errors
    expect(() => state.get(objkey)).toThrow(UndefinedStateException);
    expect(() => state.get(simplekey)).toThrow(UndefinedStateException);

    // initialize states
    const user = new User("foo", "Bob", 23);
    const version = 1;
    state.initialize(simplekey, version);
    state.initialize(objkey, user);
    expect(state.get(simplekey)).toEqual(version);

    // discard state changes
    const newUser = new User("ldsaodd", "Joe", 55);
    const newVersion = 2;
    state.set<number>(simplekey, newVersion);
    state.set<User>(objkey, newUser);
    expect(state.get(simplekey)).toEqual(newVersion);
    expect(state.get(objkey)).toEqual(newUser);

    state.discardChanges();
    expect(state.get(simplekey)).toEqual(version);
    expect(state.get(objkey)).toEqual(user);


    // commit state changes.
    state.set<number>(simplekey, newVersion);
    state.set<User>(objkey, newUser);
    expect(state.get(simplekey)).toEqual(newVersion);
    expect(state.get(objkey)).toEqual(newUser);

    state.confirmChanges();
    expect(state.get(simplekey)).toEqual(newVersion);
    expect(state.get(objkey)).toEqual(newUser);

    // make sure attempting to reinitialize throws an error
    expect(() => state.initialize(simplekey, 4)).toThrow(DuplicateStateInitializationException);
    expect(() => state.initialize(objkey, user)).toThrow(DuplicateStateInitializationException);
});