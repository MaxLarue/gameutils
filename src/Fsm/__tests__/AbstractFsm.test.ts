import {AbstractFsm} from ".."
import { Transitions } from "../AbstractFsm"
import * as exceptions from "../../Exceptions"

enum States {
  IDLE,
  RUNNING,
  JUMPING,
  FLYING,
}

class TestFsm extends AbstractFsm<States> {
  get initialState(): States {
    return States.IDLE
  }
  get transitions(): Transitions<States> {
    return [
      {from: States.IDLE, to: States.RUNNING},
      {from: States.IDLE, to: States.JUMPING},
      {from: States.RUNNING, to: States.JUMPING},
      {from: States.JUMPING, to: States.IDLE},
      {from: States.JUMPING, to: States.RUNNING},
    ]
  }
}

describe("Testing a basic fsm", () => {
  it("starts with the intial sate", () => {
    expect(new TestFsm().getState()).toBe(States.IDLE)
  })

  it("can transition to next state", () => {
    expect(new TestFsm().transitionTo(States.RUNNING).getState())
      .toBe(States.RUNNING)
  })

  it("can transition to next state, multiple times", () => {
    expect(
        new TestFsm()
          .transitionTo(States.RUNNING)
          .transitionTo(States.JUMPING)
          .getState()
      )
      .toBe(States.JUMPING)
  })

  it("cannot transition to same state (unless a transition exists)", () => {
    expect(
        () => new TestFsm()
          .transitionTo(States.RUNNING)
          .transitionTo(States.RUNNING)
          .getState()
      )
      .toThrowError(exceptions.InvalidArguments)
  })

  it("cannot transition to another state if no transition", () => {
    expect(
        () => new TestFsm()
          .transitionTo(States.RUNNING)
          .transitionTo(States.FLYING)
          .getState()
      )
      .toThrowError(exceptions.InvalidArguments)
  })

  test("We can query if transitionning is possible", () => {
    expect(new TestFsm().transitionTo(States.RUNNING).canTransitionTo(States.JUMPING))
      .toBe(true)
    expect(new TestFsm().transitionTo(States.RUNNING).canTransitionTo(States.FLYING))
      .toBe(false)
  })
})