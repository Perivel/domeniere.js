import { DateTime } from "@swindle/core";


export interface EventData {
    readonly body: string;
    readonly classification: string;
    readonly id: string;
    readonly name: string;
    readonly occuredOn: DateTime;
    readonly version: number;
}