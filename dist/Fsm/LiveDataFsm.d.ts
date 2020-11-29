import { AbstractFsm } from ".";
import { FListener } from "../Events";
import { LiveData, LiveDataUpdateEvent } from "../LiveData";
export declare type LiveDataFsmRule<LiveDataType> = (event: LiveDataUpdateEvent<LiveDataType>) => void;
export default abstract class LiveDataFsm<StateType> extends AbstractFsm<StateType> {
    protected liveDataListeners: {
        listener: FListener<any>;
        liveData: LiveData<any>;
    }[];
    purgeListeners(): void;
    protected subscribeRule<LiveDataType>(liveData: LiveData<LiveDataType>, callback: LiveDataFsmRule<LiveDataType>): void;
}
