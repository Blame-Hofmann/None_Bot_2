import * as Discord from "discord.js"
import Config from ">/config"
import arr_cmd from "./arr_cmd"

let driverCmd = (cli: Discord.Client, msg: Discord.Message) => {
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
  arr_cmd.forEach(item => {
    item.exec(msg)
  })
}
export default driverCmd
