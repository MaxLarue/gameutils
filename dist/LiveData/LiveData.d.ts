import { Emitter, IEmitter, IListener } from "../Events";
export declare type LiveDataUpdateEvent<DataType> = {
    previous?: DataType;
    next: DataType;
};
export default class LiveData<DataType> implements IEmitter<LiveDataUpdateEvent<DataType>> {
    protected data: DataType;
    protected emitter: Emitter<LiveDataUpdateEvent<DataType>>;
    constructor(initialValue: DataType);
    get(): DataType;
    set(data: DataType): void;
    subscribe(listener: IListener<LiveDataUpdateEvent<DataType>>): void;
    unSubscribe(listener: IListener<LiveDataUpdateEvent<DataType>>): void;
    purge(): void;
}
