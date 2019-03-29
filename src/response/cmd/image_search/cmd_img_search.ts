import * as Discord from "discord.js"
import get_images from "./get_images"
import Command from ">/tools/command"
import Config from ">/config"
import Global from ">/global"

let cmd_img_search = new Command()
export default cmd_img_search

cmd_img_search.cmd = [ "image", "im" ]
cmd_img_search.callback = (msg, args, txt) => {
  let search: string = txt.replace(/\s+/gi, " ").trim()

  //Check if User is in the cachelist
  if (Global.cache_img[msg.author.id] != null) {
    Global.cache_img[msg.author.id].message.clearReactions().then(() => {
      clearTimeout(Global.cache_img[msg.author.id].timer)
      delete Global.cache_img[msg.author.id]
    })
  }

  //Send a Wait! message
  msg.reply("He iniciado la búsqueda, espere por favor~").then(() => {
    let msg_wait = Global.cli.user.lastMessage
    get_images(txt, 1, urls => {
      msg_wait.delete()

      //Only for Log purposes
      console.log("\nLista de Urls")
      urls.forEach((url, i) => {
        console.log(`url nro ${i + 1} = ${url}`)
      })
      console.log("")

      msg.reply({
        embed: {
          color: 14063660,
          author: {
            name: msg.author.username + " buscó...",
            icon_url: msg.author.avatarURL
          },
          description: search,
          image: {
            url: urls[0]
          }
        }
      }).then(() => {
        let img_box = Global.cli.user.lastMessage
        img_box.react("◀").then(() => {
          img_box.react("▶").then(() => {
            img_box.react("❌").then(() => {
              //Add the search to the cache
              Global.cache_img[img_box.id] = {
                author: msg.author,
                message: img_box,
                search: txt,
                page: 1,
                urls: urls,
                position: 0,
                timer: setTimeout(() => {
                  if (Global.cache_img[img_box.id] != null) {
                    Global.cache_img[img_box.id].message.clearReactions().then(() => {
                      console.log("Killed! " + Global.cache_img[img_box.id].search)
                      delete Global.cache_img[img_box.id]
                    })
                  }
                }, 30 * 1000)
              }
            })
          })
        })
      })
    }, error => {
      msg_wait.delete()

      if (error.statusCode == 403) {
        msg.reply("Lo siento pero se ha sobrepasado el límite de búsquedas que me deja hacer el Google... :frowning:")
      } else {
        msg.reply("Lo siento pero hubo un problema técnico con la búsqueda...")
      }
    })
  })
}
