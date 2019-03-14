import * as Discord from "discord.js"
import Command from ">/tools/command"

import channel_add from "./channel_add"
import channel_del from "./channel_del"
import channel_add_all from "./channel_add_all"
import channel_del_all from "./channel_del_all"

let cmd_channel = new Command()
export default cmd_channel

cmd_channel.cmd = ["channel", "ch"]
cmd_channel.callback = (cli, msg, args) => {
  //Identify if is a PM
  if (msg.guild == null) {
    msg.reply(msg.author + ", solo se pueden administrar canales en un servidor, no tiene sentido ejecutar estos comandos por PM...")
    return
  }

  //Check Owner
  if (msg.guild.owner.id != msg.author.id) {
    msg.reply("Solo el Owner del server tiene autorización para configurar los canales admitidos. Por favor consulte la guía para más información.")
    return
  }

  //Check parameters
  if (args.length <= 1) {
    msg.reply("Usted no ha ingresado los parámetros suficientes para configurar los canales admitidos. Por favor consulte la guía para más información.")
    return
  }

  //If arg2[2] == all...
  if (`${args[1]}`.toLowerCase() == "all") {
    switch (args[0].toLowerCase()) {
      case "add":
        channel_add_all(msg)
        break

      case "del":
        channel_del_all(msg)
        break
    }

    return
  }

  //Search the channels added
  let arr_chann: Array<Discord.GuildChannel> = []
  for (let i = 1; i < args.length; i++) {
    let arr_id = args[i].match(/[0-9]+/gi)

    let chann: Discord.GuildChannel
    if (arr_id != null) {
      chann = msg.guild.channels.get(arr_id[0])
    }

    if (chann != null) {
      arr_chann.push(chann)
    }
  }

  //Return if the bot doesn't find any channel
  if (arr_chann.length == 0) {
    msg.reply("Los canales agregados no son válidos. Por favor consulte la guía para más información.")
    return
  }

  //execute commands
  switch (args[0].toLowerCase()) {
    case "add":
      channel_add(msg, arr_chann)
      break

    case "del":
      channel_del(msg, arr_chann)
      break
  }
}
