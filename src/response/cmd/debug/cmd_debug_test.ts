import * as Discord from "discord.js"
import Global from ">/global"

let cmd_debug_test = (cli: Discord.Client, msg: Discord.Message, args: Array<string>) => {
  let txt: string = "Caché de búsquedas:```Global.cache_img = {\n"

  Object.keys(Global.cache_img).forEach(key => {
    let item = Global.cache_img[key]

    txt += `  "${key}": {\n`
    txt += `    "username": ${item.author.username}\n`
    txt += `    "search": ${item.search}\n`
    txt += `    "position": ${item.position}\n`
    txt += `    "page": ${item.page}\n`
    txt += `    "urls": [\n`

    item.urls.forEach(url => {
      txt += `      "${url}",\n`
    })

    txt = txt.replace(/,$/gi, "")
    txt += `    ]\n`
    txt += "  },"
  })

  txt = txt.replace(/,$/gi, "")
  txt += "}```\n"

  msg.reply(txt)
}

export default cmd_debug_test
