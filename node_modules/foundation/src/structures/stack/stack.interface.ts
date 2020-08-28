

/**
 * StackInterface
 * 
 * StackInterface specifies the operations for a stack.
 */

export interface StackInterface<T> {

    /**
     * clear()
     * 
     * clear() clears the stack.
     */
    
    clear(): void;

    /**
     * isEmpty()
     * 
     * isEmpty() determines if the stack is empty.
     */

    isEmpty(): boolean;

    /**
     * peek()
     * 
     * peek() gets the next value in the stack.
     */

    peek(): T|null;

    /**
     * pop()
     * 
     * pop() removes the next value in the stack.
     */

    pop(): T|null;

    /**
     * push()
     * 
     * push() push pushes an item to the stack.
     * @param value The value to push.
     */

    push(value: T): void;

    /**
     * size()
     * 
     * size() gets the number of items in the stack.
     */

    size(): number;

    /**
     * toArray()
     * 
     * toArray() converts the stack to an array.
     */
    
    toArray(): Array<T>;
}