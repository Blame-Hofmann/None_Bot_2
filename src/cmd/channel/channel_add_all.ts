import * as Discord from "discord.js"
import Log from ">/tools/log"
import DB from ">/tools/db"

let channel_add_all = (msg: Discord.Message) => {
  let args: Array<Discord.GuildChannel> = []
  let chann_name: string = ""
  msg.guild.channels.forEach((item) => {
    args.push(item)
    chann_name += "#" + item.name.toUpperCase() + "; "
  })

  //Add All channels
  let i = 0
  var add = () => {
    ++i
    call()
  }
  var call = () => {
    if (i >= args.length) {
      chann_name = chann_name.replace(/,\s$/gi, ".-")

      msg.reply("Se han agregado a la Whitelist los siguientes canales:" + "```" + chann_name + "```")
      return
    }

    let param: iChannel = {
      ID_GUILD: msg.guild.id,
      GUILD_NAME: msg.guild.name,
      ID_CHANN: args[i].id,
      CHANN_NAME: args[i].name
    }

    DB.makeQuestion("set_available_channel", param, (res) => {

    }, (err) => {
      msg.reply("`#" + args[i].name.toUpperCase() + "` tuvo un ERROR!")

    }, () => {
      add()
    })
  }

  call()
}

export default channel_add_all
interface iChannel {
  ID_GUILD: string;
  GUILD_NAME: string;
  ID_CHANN: string;
  CHANN_NAME: string;
}
