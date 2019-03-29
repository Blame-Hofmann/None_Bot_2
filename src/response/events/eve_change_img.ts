import * as Discord from "discord.js"
import CliEvent from ">/tools/cli_event"
import Global from ">/global"

import iImgSearch from ">/response/cmd/image_search/i_img_search"
import get_images from ">/response/cmd/image_search/get_images"

let eve_change_img = new CliEvent()
export default eve_change_img

eve_change_img.name = [ "messageReactionAdd" ]
eve_change_img.callback = (reaction: Discord.MessageReaction, user: Discord.User) => {
  let elem: iImgSearch = Global.cache_img[reaction.message.id]

  //User Filters
  if (user.id == Global.cli.user.id) {
    return
  } else if (elem == null) {
    return
  } else if (user.id != elem.author.id) {
    reaction.remove(user.id)
    return
  }

  elem.message.edit({
    embed: {
        color: 14063660,
        author: {
          name: elem.author.username + " buscó...",
          icon_url: elem.author.avatarURL
        },
        description: "Espere un momento por favor..."
      }
    }).then(() => {
    clearTimeout(elem.timer)
    if (reaction.emoji.name == "◀") {
      reaction.remove(user.id)
      goto_left(elem)
    } else if (reaction.emoji.name == "▶") {
      reaction.remove(user.id)
      goto_right(elem)
    } else if (reaction.emoji.name == "❌") {
      goto_delete(elem)
    }
  })
}

let edit_embed = (elem: iImgSearch) => {
  console.log(`Mostrando Imagen Nro ${elem.position + 1}/${elem.urls.length}, pág ${elem.page}`)
  let msg_id = elem.message.id

  let embed = {
    embed: {
      color: 14063660,
      author: {
        name: elem.author.username + " buscó...",
        icon_url: elem.author.avatarURL
      },
      description: elem.search,
      image: {
        url: elem.urls[elem.position]
      }
    }
  }

  elem.message.edit(embed)
  elem.timer = setTimeout(() => {
    if (Global.cache_img[msg_id] != null) {
      Global.cache_img[msg_id].message.clearReactions().then(() => {
        console.log("Killed! " + Global.cache_img[msg_id].search)
        delete Global.cache_img[msg_id]
      })
    }
  }, 30 * 1000)
}

let goto_left = (elem: iImgSearch) => {
  if ((elem.position == 0) && (elem.page == 0)) {
    return
  }

  if (elem.position > 0) {
    elem.position -= 1
    edit_embed(elem)

  } else {
    elem.page -= 1

    get_images(elem.search, elem.page, urls => {
      if (urls.length == 0) {
        return
      }

      elem.position = urls.length - 1
      elem.urls = urls

      //Only for Log Purposes
      console.log("\nLista de Urls")
      elem.urls.forEach((url, i) => {
        console.log(`url nro ${i + 1} = ${url}`)
      })
      console.log("")

      edit_embed(elem)
    })
  }
}

let goto_right = (elem: iImgSearch) => {
  if (elem.position < elem.urls.length - 1) {
    elem.position += 1
    edit_embed(elem)

  } else {
    elem.page += 1
    elem.position = 0

    get_images(elem.search, elem.page, urls => {
      if (urls.length == 0) {
        return
      }
      elem.urls = urls

      console.log("\nLista de Urls")
      elem.urls.forEach((url, i) => {
        console.log(`url nro ${i + 1} = ${url}`)
      })
      console.log("")

      edit_embed(elem)
    })
  }
}

let goto_delete = (elem: iImgSearch) => {
  let msg_id = elem.message.id

  elem.message.delete().then(() => {
    clearTimeout(elem.timer)
    delete Global.cache_img[msg_id]
  })
}
