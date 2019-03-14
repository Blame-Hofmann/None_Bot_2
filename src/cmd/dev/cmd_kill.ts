import Command from ">/tools/command"
import Config from ">/config"

let cmd_kill = new Command()
export default cmd_kill

cmd_kill.cmd = "kill"
cmd_kill.callback = (cli, msg, args) => {
  //Denegar acceso a otros excepto el dev
  if (msg.author.id != Config.Cmd.id_dev) {
    msg.reply("Usted no está autorizado para ejecutar este comando...")
    return
  }

<<<<<<< HEAD
  let txt_msg = "Buenas Noches " + msg.author + "~~ :sob:"
  let fn_kill = () => {
    console.clear()
    console.log("Buenas Noches " + msg.author.username + "~~")
=======
  let txt_msg = "Buenas Noches " + msg.author + "~~"
  let fn_kill = () => {
    console.clear()
    console.log("Buenas Noches " + msg.author.username + "~~ :sob:")
>>>>>>> 7819d2d64566c014811166f850185088fd423bf9
    console.log("Bot is killed...\n")

    cli.destroy()
    process.exit()
  }

  if (msg.guild != null) {
    msg.channel.send(txt_msg).then(fn_kill)
  } else {
    msg.author.send(txt_msg).then(fn_kill)
  }
}
