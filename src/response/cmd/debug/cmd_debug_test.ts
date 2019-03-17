import * as Discord from "discord.js"

let cmd_debug_test = (cli: Discord.Client, msg: Discord.Message, args: Array<string>) => {
  msg.channel.send(msg.author + ", esta prueba intentará enviar un PM")
  msg.author.send("test PM").then(() => {
    msg.channel.send(msg.author + ", prueba **Exitosa**")
  }).catch(() => {
    msg.channel.send(msg.author + ", prueba **Fallida**")
  })
}

export default cmd_debug_test
