import Command from ">/tools/command"
import Config from ">/config"

let cmd_test = new Command()
export default cmd_test

cmd_test.cmd = "test"
cmd_test.callback = (cli, msg, args) => {
  //Denegar acceso a otros excepto el dev
  if (msg.author.id != Config.Cmd.id_dev) {
    msg.reply("usted no está autorizado para ejecutar este comando...")
    return
  }

  
}
