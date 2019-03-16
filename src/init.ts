//Configure Alias
import * as Alias from "module-alias"
Alias.addAlias(">", __dirname)

import * as Discord from "discord.js"
import Config from ">/config"
import Log from ">/tools/log"

import CmdDriver from ">/tools/cmd_driver"

//Check the correct Boot
const cli = new Discord.Client()
let conn_timer: NodeJS.Timeout

//Get Messages
cli.on("message", (msg: Discord.Message) => {
  CmdDriver(cli, msg)

})

//Init Application
Log.clear()
process.title = "None BOT [DEV]"
console.log(`-------=============>>>>NONE BOT ver0.0.1 [DEV]<<<<=============-------\n`)
Log.writeLine(`Loggin...`, 1)

//Connection Error Event
let on_error = () => {
  Log.writeLine("Lost Connection!!!", 3)
  Log.writeLine("Reconnecting in " + Config.Cmd.conn_sec + " sec. Please Wait...\n")

  clearTimeout(conn_timer)
  conn_timer = setTimeout(() => {
    Log.writeLine("Reconnecting...", 1)
    cli.login(Config.ApiKey.discord).catch(on_error)

  }, 1000 * Config.Cmd.conn_sec)
}
cli.on("error", on_error)

//Connection Successfull Event
let on_success = () => {
    Log.writeLine("Connection Successfull :^)", 2)
    Log.writeLine("Listening...")
    Log.writeSeparator()

    clearTimeout(conn_timer)
}
cli.on("ready" , on_success)
cli.on("resume", on_success)
cli.login(Config.ApiKey.discord).catch(on_error)
