import * as Discord from "discord.js"
import Config from ">/config"
import Log from ">/tools/log"
import DB from ">/tools/db"

class Command {
  private _cmd: string
  public get cmd() {
    return this._cmd
  }
  public set cmd(value: string) {
    this._cmd = value.toLowerCase()
  }

  private _callback: (cli: Discord.Client, msg: Discord.Message, args?: Array<string>, text?: string) => void
  public get callback() {
    return this._callback
  }
  /**
  Set a callback that exectute them when the "cmd" is called.
  @param cli It's the Bot's Discord Client
  @param msg It's que Message sended to the Bot
  @param args It's an Array with all arguments passet to the Bot
  */
  public set callback(value: (cli: Discord.Client, msg: Discord.Message, args?: Array<string>, text?: string) => void) {
    this._callback = value
  }

  /**
  Build a new instance of Commands
  @param cmd [optional] A string with the name of the command
  */
  constructor(cmd?: string) {
    this._callback = null

    if (cmd != null) {
      this._cmd = cmd.toLowerCase()
    } else {
      this._cmd = null
    }
  }

  /**
  This function is used only for CmdDriver
  */
  public exec(cli: Discord.Client, msg: Discord.Message) {
    let symbol: string = Config.Cmd.symbol
    let content: string = msg.content.split(/\s/gi)[0]

    //Return if the command don't match
    let regex = new RegExp(`^${symbol}${this._cmd}`, "gi")
    if (content.match(regex) == null) {
      return
    }

    //Make an Array with arguments of the command
    let args: Array<string> = []
    content = content.replace(/\s+/gi, " ")
    content.split(" ").forEach((str, i) => {
      if (i != 0) {
        args.push(str.trim())
      }
    })

    //Log this event
    Log.writeLine("Command Detected", 1)
    console.log((() => {
      let str_log: string = ""
      str_log += `                   ID   = ${msg.author.id}.-\n`
      str_log += `                   User = ${msg.author.username}.-\n`
      str_log += `                   Comm = ${this._cmd}.-\n`
      str_log += `                   Args = `
      if (args.length == 0) {
        str_log += `null`
      } else {
        let param: string = ""
        args.forEach((str, i) => {
          if (i > 0) {
            param += "; "
          }

          param += `"${str}"`
        })

        str_log += param.substr(0, 64)
        if (param.length > 64) {
          str_log += " [...]"
        }
      }

      return str_log + ".-\n"
    })())

    //Execute the command
    let text = msg.content.replace(regex, "").trim()
    this.check_db(cli, msg, args, text)
  }

  //Check if this channel as in Whitelist
  private check_db(cli: Discord.Client, msg: Discord.Message, args?: Array<string>, text?: string) {
    //Prepare execution
    let executeCmd = () => {
      this._callback(cli, msg, args, text)
      Log.writeLine("Command Executed", 2)
      Log.writeSeparator()
    }

    //Skip Channel verification if the message is PM
    if (msg.guild == null) {
      executeCmd()
      return
    }

    //Answer to que DataBase
    DB.makeQuestion(
      "get_available_channel",
      [
        msg.guild.id,
        msg.channel.id
      ], (data) => {
        let is_available: boolean = data[0].value

        if (is_available == false) {
          return
        }

        //Execute command
        executeCmd()
      })
  }
}
export default Command
