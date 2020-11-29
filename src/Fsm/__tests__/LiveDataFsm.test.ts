import {LiveDataFsm} from ".."
import {LiveData} from "../../LiveData"
import { Transitions } from "../AbstractFsm"

enum State {
  IDLING,
  RUNNING
}

class TestFsm extends LiveDataFsm<State> {
  public speed: LiveData<number> = new LiveData(0)

  constructor() {
    super()
    this.subscribeRule(
      this.speed,
      (e) => {
        if (e.previous < 0.5 && e.next > 0.5) {
          this.transitionTo(State.RUNNING)
        } else if (e.previous > 0.5 && e.next < 0.5) {
          this.transitionTo(State.IDLING)
        }
      }
    )
  }

  get initialState(): State {
    return State.IDLING
  }
  get transitions(): Transitions<State> {
    return [
      {from: State.IDLING, to: State.RUNNING},
      {from: State.RUNNING, to: State.IDLING},
    ]
  }
}

describe("testing LiveDatFsm", () => {
  it("is possible to create a new fsm", () => {
    new TestFsm()
  })
  it("will change state based on livedata", () => {
    const fsm = new TestFsm()
    expect(fsm.getState()).toBe(State.IDLING)
    fsm.speed.set(10)
    expect(fsm.getState()).toBe(State.RUNNING)
  })
  it("will change state based on livedata, back and forth", () => {
    const fsm = new TestFsm()
    expect(fsm.getState()).toBe(State.IDLING)
    fsm.speed.set(10)
    expect(fsm.getState()).toBe(State.RUNNING)
    fsm.speed.set(0)
    expect(fsm.getState()).toBe(State.IDLING)
  })
}) 