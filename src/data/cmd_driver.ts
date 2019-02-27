import * as Discord from "discord.js"
import MsgConst from ">/msg_const"
import Config from ">/config"

let CmdDriver = () => {
  //Ignore Self Messages
  if (MsgConst.cli.user == MsgConst.msg.author) {
    return
  }

  //Ignore no Commands
  let cmd_symbol: string = `${MsgConst.msg.content}`[0]
  if (Config.Cmd.cmd_symbol != cmd_symbol) {
    return
  }

  MsgConst.msg.reply("Ayyy Lmaooo")
}
export default CmdDriver
