

export default class Cooldown {
  protected _time: number
  protected _elapsed: number
  protected _lastActivation: number

  constructor(time: number) {
    this._time = time
    this._elapsed = 0
    this._lastActivation = -1 * time
  }

  public get time() {return this._time}
  public get elapsed() {return this._elapsed}
  public get ready() {
    return this._elapsed - this._lastActivation >= this._time
  }

  public addDelta(delta: number) {
    this._elapsed += delta
  }

  public activate() {
    if (this.ready) this._lastActivation = this._elapsed
  }
}