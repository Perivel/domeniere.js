/**
 * Serializable
 * 
 * Serializable indicates that an object can be serialized.
 */

export interface Serializable {

    /**
     * serialize()
     * 
     * serialize() serializes the object.
     */

    serialize(): string;
}