import * as Discord from "discord.js"
import Config from ">/config"
import Log from ">/tools/log"
import DB from ">/tools/db"

class Command {
  private _cmd: Array<string>
  public get cmd() {
    return this._cmd
  }
  public set cmd(value: Array<string>) {
    value.forEach(item => {
      item = item.toLowerCase()
    })

    this._cmd = value
  }

  private _callback: (msg: Discord.Message, args?: Array<string>, text?: string) => void
  public get callback() {
    return this._callback
  }
  /**
  Set a callback that exectute them when the "cmd" is called.
  @param cli It's the Bot's Discord Client
  @param msg It's que Message sended to the Bot
  @param args It's an Array with all arguments passet to the Bot
  */
  public set callback(value: (msg: Discord.Message, args?: Array<string>, text?: string) => void) {
    this._callback = value
  }

  /**
  Build a new instance of Commands
  @param cmd [optional] A string with the name of the command
  */
  constructor(cmd?: Array<string>) {
    this._callback = null

    if (cmd != null) {
      cmd.forEach(item => {
        item = item.toLowerCase()
      })

      this._cmd = cmd
    } else {
      this._cmd = null
    }
  }

  /**
  This function is used only for CmdDriver
  */
  public exec(msg: Discord.Message) {
    let symbol: string = Config.Cmd.symbol
    let content: string = msg.content.split(/\s/gi)[0]

    //Return if the command don't match
    let found: boolean = false
    let text_out: string = null
    this._cmd.forEach(command => {
      let regex = new RegExp(`^${symbol}${command}`, "gi")

      if (content.match(regex) != null) {
        //Make output text
        text_out = msg.content.replace(regex, "").trim()
        found = true
      }
    })

    if (found == false) {
      return
    }

    //Make an Array with arguments of the command
    let ref: Array<string> = msg.content.split(/\s+/gi)
    let args: Array<string> = []

    ref.forEach((str, i) => {
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
    this.check_db(msg, args, text_out)
  }

  //Check if this channel as in Whitelist
  private check_db(msg: Discord.Message, args?: Array<string>, text?: string) {
    //Prepare execution
    let executeCmd = () => {
      this._callback(msg, args, text)
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
