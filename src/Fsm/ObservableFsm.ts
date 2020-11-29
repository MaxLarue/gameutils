import AbstractFsm, { Transition } from "./AbstractFsm"
import { IEmitter, IListener, Emitter } from "../Events"


export default abstract class ObservableFsm<StateType>
extends AbstractFsm<StateType> 
implements IEmitter<Transition<StateType>>
{
  protected emitter: Emitter<Transition<StateType>>

  constructor() {
    super()
    this.emitter = new Emitter()
  }

  public transitionTo(state: StateType): AbstractFsm<StateType> {
    const prevState = this.state
    const ret = super.transitionTo(state)
    const newState = this.state
    this.emit({from: prevState, to: newState})
    return ret
  }

  // emitter delegation

  emit(event: Transition<StateType>): void {
    this.emitter.emit(event)
  }
  subscribe(listener: IListener<Transition<StateType>>): void {
    this.emitter.subscribe(listener)
  }
  unSubscribe(listener: IListener<Transition<StateType>>): void {
    this.emitter.unSubscribe(listener)
  }
  purge(): void {
    this.emitter.purge()
  }
  
}