/**
 * ApplicationServiceInterface.
 */
import { TransmittedEvent } from "@domeniere/event";
export interface ApiInterface {
    /**
     * broadcastEvents()
     *
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    broadcastEvents(): Promise<void>;
    /**
     * initializeEvents()
     *
     * initializes the service's state.
     */
    initializeEvents(): Promise<void>;
    /**
     * processTransmittedEvent()
     *
     * processes a transmitted event.
     * @param event the event to intake.
     */
    processTransmittedEvent(event: TransmittedEvent): Promise<void>;
}
//# sourceMappingURL=api.interface.d.ts.map