import * as Discord from "discord.js"
import Command from ">/tools/command"
import Global from ">/global"
import DB from ">/tools/db"

let cmd_channel_purge = new Command()
export default cmd_channel_purge

cmd_channel_purge.cmd = ["purge", "pg"]
cmd_channel_purge.callback = (msg, args, txt) => {
  //Check Guild
  if (msg.guild == null) {
    msg.reply("este comando solo se puede ejecutar en un servidor...")
    return
  }

  //Check user mentions
  if (msg.mentions.users.array().length == 0) {
    msg.reply("no se ha mencionado a ningún usuario...")
    return
  }

  //Check channels mentions
  if (msg.mentions.channels.array().length == 0) {
    msg.reply("no se ha mencionado a ningún canal...")
    return
  }

  //Get UserGuilds
  let im_Bot = msg.guild.member(Global.cli.user)
  let author = msg.guild.member(msg.author)
  let users: Array<Discord.GuildMember> = (() => {
    let arrData: Array<Discord.GuildMember> = []
    msg.mentions.users.array().forEach(user => {
      arrData.push(msg.guild.member(user))
    })

    return arrData
  })()

  //Check Author Permissions
  if (!checkPermission(author, ["ADMINISTRATOR"])) {
    msg.reply("No eres Administrador :frowning:")
    return
  }

  //Check Bot Permissions
  if (!checkPermission(im_Bot, ["MANAGE_MESSAGES"])) {
    msg.reply("No puedo eliminar mensajes :frowning:")
    return
  }

  //Get Users Messages
  msg.mentions.channels.array().forEach(channel => {
    channel.fetchMessages().then(messages => {
      users.forEach(user => {
        let cache = messages.filter(me => {
          let ms = Date.now()
          ms -= 1000 * 60 * 60 * 24 * 14
          ms -= 1

          if (me.author.id != user.user.id) {
            return false
          }

          if(me.createdAt.valueOf() <= ms) {
            return false
          } else {

            return true
          }
        }).array()
        channel.bulkDelete(cache)
      })
    })
  })

  //Finished
  msg.reply(`done...`)

}

//Check Permissions
let checkPermission = (member: Discord.GuildMember, permission: Array<string>) => {
  let found = false
  member.permissions.toArray().forEach(value => {
    permission.forEach(ref => {
      if (value == ref) {
        found = true
      }
    })
  })

  return found
}
