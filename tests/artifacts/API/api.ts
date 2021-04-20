import { Queue } from "@perivel/foundation";
import { Api } from "../../../src/api/api.module";
import { Domain } from "../../../src/domain/domain.module";
import { DomainEvent, EventStore, StoredEvent } from "../../../src/event/event.module";
import { TestModule, TestModule2 } from "../modules/test-module";
import { HashStringQuery, RegularHashQuery } from "../services/reverse-string.query";

class MyEventStore extends EventStore {
    protected async boradcastEvents(eventQueue: Queue<DomainEvent>): Promise<void> {
        
    }
    protected async saveEvents(eventQueue: Queue<StoredEvent>): Promise<void> {
        
    }
    
}

export class ValidAPI extends Api {
    constructor() {
        super(new MyEventStore());
        const testModule = new TestModule();
        testModule.registerServiceInstance(HashStringQuery, new RegularHashQuery());
        this.registerModule(testModule);
    }

    public async getString(): Promise<string> {
        return await Domain.Module('testmod').get(HashStringQuery).execute("Foo");
    }
}

export class InvalidAPI extends Api {
    constructor() {
        super(new MyEventStore());
        const testModule = new TestModule2();
        this.registerModule(testModule);
    }

    public async getString(): Promise<string> {
        return await Domain.Module('testmod').get(HashStringQuery).execute("Foo");
    }
}