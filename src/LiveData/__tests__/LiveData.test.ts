import LiveData, {LiveDataUpdateEvent} from "../LiveData"
import { IListener } from "../../Events"

class DummyObject {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}

class LiveDataSyncer<DataType> implements IListener<LiveDataUpdateEvent<DataType>> {
  public data: DataType
  onEvent(event: LiveDataUpdateEvent<DataType>) {
    this.data = event.next
  }
}

describe("testing LiveData", () => {
  it("allows us to set/get numbers", () => {
    const liveData = new LiveData<number>(0)
    expect(liveData.get()).toEqual(0)
    liveData.set(5)
    expect(liveData.get()).toEqual(5)
  })
  it("allows us to set/get strings", () => {
    const liveData = new LiveData<string>("")
    expect(liveData.get()).toEqual("")
    liveData.set("hello")
    expect(liveData.get()).toEqual("hello")
  })
  it("allows us to set/get complex objects", () => {
    const initialObject = new DummyObject("")
    const liveData = new LiveData<DummyObject>(initialObject)
    expect(liveData.get()).toEqual(initialObject)
    liveData.set(new DummyObject("hi"))
    expect(liveData.get()).not.toEqual(initialObject)
  })
})

describe("test listening on live data", () => {
  it("sends an event without 'from' on subscription", () => {
    const liveData = new LiveData<number>(3)
    const synced = new LiveDataSyncer()
    liveData.subscribe(synced)
    expect(synced.data).toBe(3)
  })
  it("sends an event when changing the data inside", () => {
    const liveData = new LiveData<number>(3)
    const synced = new LiveDataSyncer()
    liveData.subscribe(synced)
    liveData.set(7)
    expect(synced.data).toBe(7)
  })
  it("allows us to unsubscribe", () => {
    const liveData = new LiveData<number>(3)
    const synced = new LiveDataSyncer()
    liveData.subscribe(synced)
    liveData.set(7)
    liveData.unSubscribe(synced)
    liveData.set(9)
    expect(synced.data).toBe(7)
  })
  it("allows us to unsubscribe, with purge", () => {
    const liveData = new LiveData<number>(3)
    const synced = new LiveDataSyncer()
    liveData.subscribe(synced)
    liveData.set(7)
    liveData.purge()
    liveData.set(9)
    expect(synced.data).toBe(7)
  })
})