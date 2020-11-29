import {ObservableFsm} from ".."
import { IListener } from "../../Events"
import { Transition, Transitions } from "../AbstractFsm"

enum State {
  RUNING,
  JUMPING,
  DUCKING,
  IDLING,
  LANDING
}

class TestFsm extends ObservableFsm<State> {
  get initialState(): State {
    return State.IDLING
  }
  get transitions(): Transitions<State> {
    return [
      {from: State.IDLING, to: State.RUNING},
      {from: State.IDLING, to: State.DUCKING},
      {from: State.RUNING, to: State.JUMPING},
      {from: State.JUMPING, to: State.LANDING},
      {from: State.LANDING, to: State.IDLING},
    ]
  }
}

class DummyListener implements IListener<Transition<State>> {
  public history: Transition<State>[] = []

  onEvent(event: Transition<State>) {
    this.history.push(event)
  }

}

describe("Testing the observable fsm", () => {
  it("records whatever transition happens in the fsm", () => {
    const listener = new DummyListener()
    const fsm = new TestFsm()
    fsm.subscribe(listener)
    fsm.transitionTo(State.RUNING)
    fsm.transitionTo(State.JUMPING)
    fsm.transitionTo(State.LANDING)
    fsm.transitionTo(State.IDLING)
    fsm.transitionTo(State.DUCKING)
    expect(listener.history)
      .toEqual([
        {from: State.IDLING, to: State.RUNING},
        {from: State.RUNING, to: State.JUMPING},
        {from: State.JUMPING, to: State.LANDING},
        {from: State.LANDING, to: State.IDLING},
        {from: State.IDLING, to: State.DUCKING},
      ])
  })
})