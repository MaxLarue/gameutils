import {Emitter, IListener} from ".."


enum Events {
  BIRTH,
  SCHOOL,
  WORK,
  WEDDING,
  DEATH
}

class DummyListener implements IListener<Events> {
  public recordedEvents: Events[]
  constructor() {this.recordedEvents = []}
  onEvent(event: Events) {
    this.recordedEvents.push(event)
  }
}

describe("Emitting with a single listener", () => {
  it("Generates the event, listener receives it", () => {
    const emitter = new Emitter<Events>()
    const listener = new DummyListener()
    emitter.subscribe(listener)
    expect(listener.recordedEvents.length).toBe(0)
    emitter.emit(Events.BIRTH)
    expect(listener.recordedEvents).toEqual([Events.BIRTH])
  })

  it("Generates multiple events, listener receives all", () => {
    const emitter = new Emitter<Events>()
    const listener = new DummyListener()
    emitter.subscribe(listener)
    expect(listener.recordedEvents.length).toBe(0)
    emitter.emit(Events.BIRTH)
    emitter.emit(Events.SCHOOL)
    emitter.emit(Events.WORK)
    emitter.emit(Events.WEDDING)
    emitter.emit(Events.DEATH)
    expect(listener.recordedEvents).toEqual([
      Events.BIRTH,
      Events.SCHOOL,
      Events.WORK,
      Events.WEDDING,
      Events.DEATH
    ])
  })

  test("we can unsubscribe from an emitter", () => {
    const emitter = new Emitter<Events>()
    const listener = new DummyListener()
    emitter.subscribe(listener)
    emitter.emit(Events.BIRTH)
    expect(listener.recordedEvents.length).toBe(1)
    emitter.unSubscribe(listener)
    emitter.emit(Events.BIRTH)
    expect(listener.recordedEvents.length).toBe(1)
  })

  test("if we purge an emitter, our listener won't be called", () => {
    const emitter = new Emitter<Events>()
    const listener = new DummyListener()
    emitter.subscribe(listener)
    emitter.emit(Events.BIRTH)
    expect(listener.recordedEvents.length).toBe(1)
    emitter.purge()
    emitter.emit(Events.BIRTH)
    expect(listener.recordedEvents.length).toBe(1)
  })
})

describe("Emitting with multiple listeners", () => {
  it("Generates the event, both listener receives it", () => {
    const emitter = new Emitter<Events>()
    const listener1 = new DummyListener()
    const listener2 = new DummyListener()
    emitter.subscribe(listener1)
    emitter.subscribe(listener2)
    expect(listener1.recordedEvents.length).toBe(0)
    expect(listener2.recordedEvents.length).toBe(0)
    emitter.emit(Events.BIRTH)
    expect(listener1.recordedEvents).toEqual([Events.BIRTH])
    expect(listener2.recordedEvents).toEqual([Events.BIRTH])
  })

  test("if only one listener is subscribed, only he receives the event", () => {
    const emitter = new Emitter<Events>()
    const listener1 = new DummyListener()
    const listener2 = new DummyListener()
    emitter.subscribe(listener1)
    expect(listener1.recordedEvents.length).toBe(0)
    expect(listener2.recordedEvents.length).toBe(0)
    emitter.emit(Events.BIRTH)
    expect(listener1.recordedEvents).toEqual([Events.BIRTH])
    expect(listener2.recordedEvents).toEqual([])
  })

  test("if we purge an emitter, both listeners won't be called", () => {
    const emitter = new Emitter<Events>()
    const listener1 = new DummyListener()
    const listener2 = new DummyListener()
    emitter.subscribe(listener1)
    emitter.subscribe(listener2)
    emitter.purge()
    emitter.emit(Events.BIRTH)
    expect(listener1.recordedEvents).toEqual([])
    expect(listener2.recordedEvents).toEqual([])
  })
})