import { IListener } from "..";
export declare type FListenerCallback<EventType> = (event: EventType) => void;
export default class FListener<EventType> implements IListener<EventType> {
    protected callback: FListenerCallback<EventType>;
    constructor(callback: FListenerCallback<EventType>);
    onEvent(event: EventType): void;
}
