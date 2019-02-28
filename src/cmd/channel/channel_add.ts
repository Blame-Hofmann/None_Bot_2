import * as Discord from "discord.js"
import Log from ">/tools/log"
import DB from ">/tools/db"

let channel_add = (msg: Discord.Message, args: Array<Discord.GuildChannel>) => {

  let i = 0
  var add = () => {
    ++i
    call()
  }
  var call = () => {
    if (i >= args.length) {
      return
    }

    let param: iChannel = {
      ID_GUILD: msg.guild.id,
      GUILD_NAME: msg.guild.name,
      ID_CHANN: args[i].id,
      CHANN_NAME: args[i].name
    }

    DB.makeQuestion("set_available_channel", param, (res) => {
      let created: boolean = res[0].value

      if (created == true) {
        msg.reply("`#" + args[i].name.toUpperCase() + "` agregado!")

      } else {
        msg.reply("`#" + args[i].name.toUpperCase() + "` ya se encuentra en la lista...")

      }

    }, (err) => {
      msg.reply("`#" + args[i].name.toUpperCase() + "` tuvo un ERROR!")

    }, () => {
      add()
    })
  }

  call()
}

export default channel_add
interface iChannel {
  ID_GUILD: string;
  GUILD_NAME: string;
  ID_CHANN: string;
  CHANN_NAME: string;
}
