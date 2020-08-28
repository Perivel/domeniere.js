import { PriorityQueueNode } from "./priority-queue-node";
import { PriorityQueueInterface } from "./priority-queue.interface";

/**
 * PriorityQueue
 * 
 * PriorityQueue is a priority queue.
 */

export class PriorityQueue<T> implements PriorityQueueInterface<T> {

    private _values: Array<PriorityQueueNode<T>>;

    constructor() {
        this._values = new Array<PriorityQueueNode<T>>();
    }

    /**
     * clear()
     * 
     * clear() clears the queue.
     */

    public clear(): void {
        this._values = new Array<PriorityQueueNode<T>>();
    }

    /**
     * dequeue()
     * 
     * dequeue() removes the next item in the queue.
     */

    public dequeue(): T | null {
        let value: T|null = null;

        if (!this.isEmpty()) {
            value = this._values.shift()!.value();
        }

        return value;
    }

    /**
     * enqueue()
     * 
     * enqueue() inserts an item into the queue.
     * @param value the value to insert.
     * @param priority the priority of this value. The lower the priority, the earlier in the queue the item will be placed.
     */

    public enqueue(value: T, priority: number): void {
        const node = new PriorityQueueNode<T>(value, priority);
        const size = this.size();
        let contains = false;
        
        let i = 0;
        for (i = 0; i < size; i++) {
            if (this._values[i].priority() > node.priority()) {
                this._values.splice(i, 0, node);
                contains = true;
                break;
            }
        }

        if (!contains) {
            this._values.push(node);
        }
    }

    /**
     * isEmpty()
     * 
     * isEmpty() determines if the queue is empty.
     */

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * peek()
     * 
     * peek() gets the next item in the queue, but does not remove it.
     */

    public peek(): T|null {
        let value: T|null = null;

        if (!this.isEmpty()) {
            value = this._values[0].value();
        }

        return value;
    }

    /**
     * size()
     * 
     * size() gets the number of elements in the queue.
     */
    public size(): number {
        return this._values.length;
    }

    /**
     * toArray()
     * 
     * toArray() converts the queue to an array.
     */

    public toArray(): Array<T> {
        const arr = new Array<T>();
        this._values.forEach(node => arr.push(node.value()));
        return arr;
    }
}