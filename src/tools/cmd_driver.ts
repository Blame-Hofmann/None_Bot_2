import * as Discord from "discord.js"
import Config from ">/config"
import cmd_list from ">/cmd_list"

let CmdDriver = (cli: Discord.Client, msg: Discord.Message) => {
  //Ignore Self Messages
  if (cli.user == msg.author) {
    return
  }

  //Ignore no Commands
  let cmd_symbol: string = `${msg.content}`[0]
  if (Config.Cmd.symbol != cmd_symbol) {
    return
  }

  //Search the Command
  cmd_list.forEach(item => {
    item.exec(cli, msg)
  })
}
export default CmdDriver
