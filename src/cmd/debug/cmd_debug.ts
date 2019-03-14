import Command from ">/tools/command"
import Config from ">/config"

import cmd_debug_kill from "./cmd_debug_kill"
import cmd_debug_test from "./cmd_debug_test"

let cmd_debug = new Command()
export default cmd_debug

cmd_debug.cmd = ["debug", "db"]
cmd_debug.callback = (cli, msg, args, txt) => {
  //Reject execution if the user isn't the developer
  let txt_err: string = ""
  // if (msg.author.id != Config.Cmd.id_dev) {
  //   txt_err = `Usted no es el desarrollador de la aplicación, no tiene acceso a este grupo de comandos.`
  //   msg.reply(txt_err)
  //   return
  // }

  //Reject the request when the user doesn't add arguments
  if (args.length == 0) {
    txt_err = `Usted no ha ingresado algún subcomando especificado. Por favor revise los comandos disponibles `
    txt_err += "en `" + Config.Cmd.symbol + "help debug `."
    msg.reply(txt_err)
    return
  }

  //search subcommands
  switch (args[0].toLowerCase()) {
    case "kill":
      cmd_debug_kill(cli, msg)
      break

    case "test":
      cmd_debug_test(cli, msg, args)
      break

    default:
      let txt = `El Subcomando especificado no existe. Por favor revise los comandos disponibles `
      txt += "en `" + Config.Cmd.symbol + "help debug `."
      msg.reply(msg)
      break
  }
}
