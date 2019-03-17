import * as Discord from "discord.js"

module Global {
  export const cli = new Discord.Client()
  export let conn_timer: NodeJS.Timeout
}
export default Global
