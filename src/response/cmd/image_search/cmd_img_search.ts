import get_images from "./get_images"
import Command from ">/tools/command"
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

  get_images(txt, 1, urls => {
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
        img_box.react("▶")
      })

      Global.cache_img[msg.author.id] = {
        author: msg.author,
        message: img_box,
        search: txt,
        page: 1,
        urls: urls,
        position: 0,
        timer: setTimeout(() => {
          if (Global.cache_img[msg.author.id] != null) {
            Global.cache_img[msg.author.id].message.clearReactions().then(() => {
              console.log("Killed! " + Global.cache_img[msg.author.id].search)
              delete Global.cache_img[msg.author.id]
            })
          }
        }, 30 * 1000)
      }
    })
  })
}
