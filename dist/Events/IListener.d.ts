export default interface Listener<EventType> {
    onEvent(event: EventType): any;
}
