import {IEmitter} from "."
import IListener from "./IListener";

export default class Emitter<EventType> implements IEmitter<EventType> {
  private listeners: Set<IListener<EventType>>

  constructor() {
    this.listeners = new Set()
  }

  emit(event: EventType): void {
    this.listeners.forEach(listener => listener.onEvent(event))
  }
  subscribe(listener: IListener<EventType>): void {
    this.listeners.add(listener)
  }
  unSubscribe(listener: IListener<EventType>): void {
    this.listeners.delete(listener)
  }
  purge(): void {
    this.listeners.clear()
  }

}