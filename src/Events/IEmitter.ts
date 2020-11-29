import {IListener} from "."

export default interface IEmitter<EventType> {
  subscribe(listener: IListener<EventType>): void
  unSubscribe(listener: IListener<EventType>): void
  purge(): void
}