import * as Discord from "discord.js"
import Log from ">/tools/log"
import DB from ">/tools/db"

let channel_del = (msg: Discord.Message, args: Array<Discord.GuildChannel>) => {

  let i = 0
  var add = () => {
    ++i
    call()
  }
  var call = () => {
    if (i >= args.length) {
      return
    }

    DB.makeQuestion("del_available_channel", [ args[i].id ], (res) => {
      msg.reply("`#" + args[i].name.toUpperCase() + "` quitado!")

    }, (err) => {
      msg.reply("`#" + args[i].name.toUpperCase() + "` tuvo un ERROR al intentar eliminar!")

    }, () => {
      add()
    })
  }

  call()
}
export default channel_del
