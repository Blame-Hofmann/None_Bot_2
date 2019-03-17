import * as Discord from "discord.js"
import iImgSearch from ">/response/cmd/image_search/i_img_search"

module Global {
  export const cli = new Discord.Client()
  export let conn_timer: NodeJS.Timeout
  export let cache_img: {[id: string]: iImgSearch} = {}
}
export default Global
