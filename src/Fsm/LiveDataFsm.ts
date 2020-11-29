import {AbstractFsm} from "."
import { FListener } from "../Events";
import { LiveData, LiveDataUpdateEvent } from "../LiveData";

export type LiveDataFsmRule<LiveDataType> = 
  (event: LiveDataUpdateEvent<LiveDataType>) => void

export default abstract class LiveDataFsm<StateType>
extends AbstractFsm<StateType> {
  protected liveDataListeners: {listener: FListener<any>, liveData: LiveData<any>}[] = []

  public purgeListeners(): void {
    for (const {listener, liveData} of this.liveDataListeners) {
      liveData.unSubscribe(listener)
    }
    this.liveDataListeners = []
  }

  protected subscribeRule<LiveDataType>(
    liveData: LiveData<LiveDataType>, 
    callback: LiveDataFsmRule<LiveDataType>): void 
  {
    const listener: FListener<any> = new FListener(callback)
    liveData.subscribe(listener)
    this.liveDataListeners.push({listener, liveData})
  }
}