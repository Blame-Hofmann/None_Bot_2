import * as Discord from "discord.js"
import Config from ">/config"

class Command {
  private _cmd: string
  public get cmd() {
    return this._cmd
  }
  public set cmd(value: string) {
    this._cmd = value
  }

  private _callback: (cli: Discord.Client, msg: Discord.Message, args: Array<String>) => void
  public get callback() {
    return this._callback
  }
  /**
  Set a callback that exectute them when the "cmd" is called.
  @param cli It's the Bot's Discord Client
  @param msg It's que Message sended to the Bot
  @param args It's an Array with all arguments passet to the Bot
  */
  public set callback(value: (cli: Discord.Client, msg: Discord.Message, args: Array<String>) => void) {
    this._callback = value
  }

  /**
  Build a new instance of Commands
  @param cmd [optional] A string with the name of the command
  */
  constructor(cmd?: string) {
    this._cmd = cmd
    this._callback = null
  }

  /**
  This function is used only for CmdDriver
  */
  public exec(cli: Discord.Client, msg: Discord.Message) {
    let symbol: string = Config.Cmd.symbol
    let content: string = msg.content

    //Return if the command don't match
    if (content.match(new RegExp(`^${symbol}${this._cmd}`, "gi")) == null) {
      return
    }

    let args: Array<string> = []
    content = content.replace(/\s+/gi, " ")
    content.split(" ").forEach((str, i) => {
      if (i != 0) {
        args.push(str.trim())
      }
    })

    //Execute the command
    this._callback(cli, msg, args)

  }
}
export default Command
