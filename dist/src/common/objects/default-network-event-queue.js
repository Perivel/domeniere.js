var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NetworkEventQueue } from "./network-event-queue";
import { Queue } from "foundation";
export class DefaultNetworkEventQueue extends NetworkEventQueue {
    constructor() {
        super();
        this.queue = new Queue();
    }
    dequeue() {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = new Array();
            while (!this.queue.isEmpty()) {
                elements.push(this.queue.dequeue());
            }
            return elements;
        });
    }
    enqueue(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue.enqueue(event);
        });
    }
}
