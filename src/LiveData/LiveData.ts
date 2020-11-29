import { Emitter, IEmitter, IListener } from "../Events"

export type LiveDataUpdateEvent<DataType> = {previous?: DataType, next: DataType}

export default class LiveData<DataType> implements IEmitter<LiveDataUpdateEvent<DataType>> {
  protected data: DataType
  protected emitter: Emitter<LiveDataUpdateEvent<DataType>>

  constructor(initialValue: DataType) {
    this.data = initialValue
    this.emitter = new Emitter()
  }

  public get(): DataType {return this.data}
  public set(data: DataType): void {
    this.emitter.emit({previous: this.data, next: data})
    this.data = data
  }
  
  // emitter delegation

  subscribe(listener: IListener<LiveDataUpdateEvent<DataType>>): void {
    this.emitter.subscribe(listener)
    this.emitter.emit({next: this.data})
  }
  unSubscribe(listener: IListener<LiveDataUpdateEvent<DataType>>): void {
    this.emitter.unSubscribe(listener)
  }
  purge(): void {
    this.emitter.purge()
  }

}