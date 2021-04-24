
/**
 * ApplicationServiceInterface.
 */

export interface ApiInterface {

    /**
     * broadcastEvents()
     * 
     * broadcastEvents() broadcasts all unpublished events to the network.
     */
    
    broadcastEvents(): Promise<void>;
}