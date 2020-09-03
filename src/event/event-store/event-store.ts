import { DomainEvent } from "../domain-event/domain-event";
import { StoredEvent } from "./stored-event";
import { CronJob, CronTime } from 'cron';

/**
 * EventStore
 * 
 * EventStore defines the event store.
 */

export abstract class EventStore {

    private _maxUnpublishedEventsAllowed: number;
    private _scheduledProcedure: CronJob;

    constructor() {
        this._maxUnpublishedEventsAllowed = 50;
        this._scheduledProcedure = this.createCronJob();
        this._scheduledProcedure.start();
    }

    /**
     * broadcastEvent()
     * 
     * broadcastEvent() broadcasts event.
     * @param event The event to broadcast.
     */

    protected abstract async broadcastEvent(event: StoredEvent): Promise<void>;

    /**
     * getUnpublishedEvents()
     * 
     * getUnpublishedEvents() gets the unpublished events form the event store.
     */

    protected abstract getUnpublishedEvents(): Promise<StoredEvent[]>

    /**
     * save()
     * 
     * save() persists a stored event to the event store.
     * @param event the event to persist in storage.
     */

    protected async abstract save(events: StoredEvent|StoredEvent[]): Promise<void>;

    /**
     * store()
     * 
     * store() stores the event.
     * @param event The event to store.
     */

    public async store(event: DomainEvent): Promise<void> {
        // create the SotoredEvent
        const storedEvent = new StoredEvent(
            event.eventId().id(),
            event.eventName(),
            event.eventClassification(),
            event.eventVersion(),
            event.serialize(),
            event.occuredOn()
        );

        // Save the stored event.
        try {
            // store the event.
            await this.save(storedEvent);
        }
        catch(error) {
            // failed to store the event.
        }
    }

    /**
     * publisheEvents()
     * 
     * publishEvents() publishes the unpublished events.
     */

    public async publishEvents(): Promise<void> {
        // get unppublished events.
        const unpublishedEvents = await this.getUnpublishedEvents();

        if (unpublishedEvents.length > 0) {
            // sort the evnets.
            unpublishedEvents.sort((a, b) => {
                let comparisonResult = 0;

                if (a.occuredOn().isBefore(b.occuredOn())) {
                    comparisonResult = -1;
                }
                else if (a.occuredOn().isAfter(b.occuredOn())) {
                    comparisonResult = 1;
                }

                return comparisonResult;
            });

            // publish the events.
            const publishedEvents = new Array<StoredEvent>();
            await this.forEveryStoredEvent(unpublishedEvents, async event => {
                try {
                    // send the request
                    await this.broadcastEvent(event);
                    event.markPublished();
                    publishedEvents.push(event);
                    return true;
                }
                catch (error) {
                    return false;
                }
            });

            // update the published events.
            await this.save(publishedEvents);
        }
    }

    // HELPERS

    /**
     * forEveryStoredEvent()
     * 
     * runs a predicate function for every elemet of the array.
     * @param arr The array to itterate over.
     * @param predicate The function to call for each element in the array.
     */

    private async forEveryStoredEvent(arr: Array<StoredEvent>, predicate: (d: StoredEvent) => Promise<boolean>): Promise<boolean> {
        for(let e of arr) {
            if (!await predicate(e)) {
                return false;
            }
        }
        return true;
    }

    /**
     * createCronJob()
     * 
     * createCronJob() creates the procedure.
     */

    private createCronJob(): CronJob {
        const everyTenMinutes = '*/10 * * * *';
        return new CronJob(everyTenMinutes, this.publishEvents);
    }
}