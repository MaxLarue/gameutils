import * as exceptions from "../Exceptions"

export type Transition<StateType> = {from: StateType, to: StateType}
export type Transitions<StateType> = Transition<StateType>[]

export default abstract class AbstractFsm<StateType> {
  protected state: StateType

  constructor() {
    this.init()
  }

  abstract get initialState(): StateType
  abstract get transitions(): Transitions<StateType>
  
  public getState(): StateType {
    return this.state
  }

  public transitionTo(state: StateType): AbstractFsm<StateType> {
    if (!this.canTransitionTo(state))
      throw new exceptions.InvalidArguments(`Tried transitioning from ${this.state} to ${state}, which doesn't have a transition`);
    this.state = state
    return this
  }

  public canTransitionTo(state: StateType): boolean {
    return this.getTransitionsFrom(this.state).map(s => s.to).includes(state)
  }
  
  protected init() {
    this.state = this.initialState
  }

  protected getTransitionsFrom(from: StateType): Transitions<StateType> {
    return this.transitions.filter(transition => transition.from === from)
  }

  protected getTransitionsTo(to: StateType): Transitions<StateType> {
    return this.transitions.filter(transition => transition.to === to)
  }

}