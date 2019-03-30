import Command from ">/tools/command"
import Log from ">/tools/log"

let cmd_avatar = new Command()
export default cmd_avatar

cmd_avatar.cmd = [ "avatar", "av" ]
cmd_avatar.callback = (msg, args) => {
  let xuser = msg.mentions.users.array()
  let embed = {
    color: 14063660,
    author: {
      name: msg.author.username + " solicitó...",
      icon_url: msg.author.avatarURL
    },
    description: "",
    image: {
      url: ""
    }
  }

  if (xuser.length > 0) {
    embed.description = "El avatar de **" + xuser[0].username + "**!"
    embed.image.url = xuser[0].avatarURL
  } else {
    embed.description = "Su propio avatar!"
    embed.image.url = msg.author.avatarURL
  }

  msg.reply({
    embed: embed
  }).catch(() => {
    Log.writeLine("El usuario tiene los mensajes personales Bloqueados...", 3)
    Log.writeLine("Petición rechazada.\n")
  })
}
