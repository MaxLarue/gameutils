import {IListener} from ".."

export type FListenerCallback<EventType> = (event: EventType) => void

export default class FListener<EventType> implements IListener<EventType> {
  protected callback: FListenerCallback<EventType>

  constructor(callback: FListenerCallback<EventType>) {
    this.callback = callback
  }

  onEvent(event: EventType) {
    this.callback(event)
  }

}