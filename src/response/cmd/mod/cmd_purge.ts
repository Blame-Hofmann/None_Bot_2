import * as Discord from "discord.js"
import Command from ">/tools/command"
import Global from ">/global"

let cmd_purge = new Command()
export default cmd_purge

cmd_purge.cmd = ["purge", "pg"]
cmd_purge.callback = (msg, args, txt) => {
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
  if (!checkPermission(author, ["MANAGE_MESSAGES"])) {
    msg.reply("No tienes permisos para **Administrar Mensajes** :frowning:")
    return
  }

  //Check Bot Permissions
  if (!checkPermission(im_Bot, ["MANAGE_MESSAGES"])) {
    msg.reply("No tengo permisos para **Administrar Mensajes** :frowning:")
    return
  }

  //Get Users Messages
  msg.mentions.channels.array().forEach(channel => {
    let keep = true

    while (keep) {
      let check = false

      channel.fetchMessages({limit: 99}).then(messages => {
        users.forEach(user => {
          let cache = messages.filter(me => {
            if ((me.author.id == user.user.id) && compareDate(me.createdAt)) {
              return true
            } else {
              return false
            }
          }).array()

          //delete
          if (cache.length == 0) {
            check = false
          } else {
            check = true
            channel.bulkDelete(cache)
          }
        })
      })

      keep = check
    }

  })

  //Finished
  msg.reply(`Purga Completada!`).then((sent) => {
    let resp = sent as Discord.Message
    resp.delete(2000)
  })
}

//Check Permissions
let checkPermission = (member: Discord.GuildMember, permission: Array<string>) => {
  let found: Array<boolean> = []
  permission.forEach(ref => {
    let compare = false

    member.permissions.toArray().forEach(val => {
      if (val == ref) {
        compare = true
      }
    })

    found.push(compare)
  })

  let out = true
  found.forEach(item => {
    if (!item) {
      out = false
    }
  })

  return out
}

//Compare Date
let compareDate = (ref: Date): boolean => {
  let ms = Date.now()
  ms -= 1000 * 60 * 60 * 24 * 14
  ms -= 1

  if(ref.valueOf() <= ms) {
    return false
  } else {
    return true
  }
}
