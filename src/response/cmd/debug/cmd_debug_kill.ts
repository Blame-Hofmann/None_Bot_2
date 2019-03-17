import * as Discord from "discord.js"

let cmd_debug_kill = (cli: Discord.Client, msg: Discord.Message) => {
  //Kill the Bot
  let txt_msg = "Buenas Noches " + msg.author + "~~ :sob:"
  let fn_kill = () => {
    console.clear()
    console.log("Buenas Noches " + msg.author.username + "~~")
    console.log("Bot is killed...\n")

    cli.destroy()
    process.exit()
  }

  //Display Message
  if (msg.guild != null) {
    msg.channel.send(txt_msg).then(fn_kill)
  } else {
    msg.author.send(txt_msg).then(fn_kill)
  }
}

export default cmd_debug_kill
