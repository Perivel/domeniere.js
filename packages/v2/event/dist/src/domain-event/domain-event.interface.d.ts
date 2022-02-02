export interface DomainEventInterface {
    /**
     * eventClassification()
     *
     * eventClassification() gets the event classification.
     */
    eventClassification(): string;
    /**
     * isError()
     *
     * isError() indicates if the event is an error event.
     */
    isError(): boolean;
    /**
     * isInternal()
     *
     * isInternal() determines if the event is an internal framework event.
     */
    isInternal(): boolean;
    /**
     * version()
     *
     * version() gets the version number of the event.
     */
    eventVersion(): number;
    /**
     * shouldBeBroadcasted()
     *
     * shouldBeBroadcasted() determines if the event should be broadcasted to the network.
     */
    shouldBeBroadcasted(): boolean;
}
//# sourceMappingURL=domain-event.interface.d.ts.map