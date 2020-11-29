import { IEmitter } from ".";
import IListener from "./IListener";
export default class Emitter<EventType> implements IEmitter<EventType> {
    private listeners;
    constructor();
    emit(event: EventType): void;
    subscribe(listener: IListener<EventType>): void;
    unSubscribe(listener: IListener<EventType>): void;
    purge(): void;
}
