//Configure Alias
import * as Alias from "module-alias"
Alias.addAlias(">", __dirname)

import * as Discord from "discord.js"
import Config from ">/config"
import Log from ">/tools/log"

import CmdDriver from ">/tools/cmd_driver"

//Check the correct Boot
const cli = new Discord.Client()
cli.once("ready", () => {
    Log.writeLine("Connection Successfull :^)", 2)
    Log.writeLine("Listening...", 1)
    Log.writeSeparator()
})

//Get Messages
cli.on("message", (msg: Discord.Message) => {
  CmdDriver(cli, msg)

})

//Login
Log.clear()
process.title = "None BOT [dev]"
console.log(`-------=============>>>>NONE BOT ver0.0.1 [DEV]<<<<=============-------\n`)
Log.writeLine(`Loggin...`, 1)
cli.login(Config.ApiKey.discord)
