import * as Discord from "discord.js"

class CliEvent {
  private _name: Array<string>
  public get name() {
    return this._name
  }
  public set name(value: Array<string>) {
    this._name = value
  }

  private _callback: (...args: any) => void
  public get callback() {
    return this._callback
  }
  public set callback(value: (...args: any) => void) {
    this._callback = value
  }

  public constructor() {
    this._name = []
    this._callback = null
  }

  public exec(cli: Discord.Client) {
    this._name.forEach(event => {
      cli.on(event, this._callback)
    })
  }
}
export default CliEvent
