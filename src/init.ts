//Configure Alias
import * as Alias from "module-alias"
Alias.addAlias(">", __dirname)

import * as Discord from "discord.js"
import Config from ">/config"
import Log from ">/tools/log"

import CmdDriver from ">/data/cmd_driver"
import MsgConst from ">/msg_const"

//Check the correct Boot
const cli = new Discord.Client()
cli.once("ready", () => {
    Log.writeLine("Connection Successfull :^)", 2)
    Log.writeLine("Listening...\n", 1)
})

//Get Messages
cli.on("message", (msg: Discord.Message) => {
  MsgConst.cli = cli
  MsgConst.msg = msg
  CmdDriver()

})

//Login
Log.clear()
console.log(`-------=============>>>>NONE BOT ver0.0.1<<<<=============-------\n`)
Log.writeLine(`Loggin...`, 1)
cli.login(Config.ApiKey.discord)
