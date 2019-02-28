import * as Discord from "discord.js"
import Log from ">/tools/log"
import DB from ">/tools/db"

let channel_del = (msg: Discord.Message) => {
    DB.makeQuestion("del_all_channels", [ msg.guild.id ], (res) => {
      msg.reply("Se ha reestablecido toda la configuración de los canales. Ahora el bot tendrá acceso a todos los canales del servidor.")

    }, (err) => {
      msg.reply("tuvo un ERROR al intentar reestablecer la configuración de canales!")

    })

}
export default channel_del
