//Configure Alias
import * as Alias from "module-alias"
Alias.addAlias(">", __dirname)

import driverEvent from ">/driver/driver_event"
import Global from ">/global"
import Config from ">/config"
import Log from ">/tools/log"

//Setting events
driverEvent()

//Init Application
Log.clear()
process.title = "None BOT [DEV]"
console.log(`-------=============>>>>NONE BOT ver0.0.1 [DEV]<<<<=============-------\n`)
Log.writeLine(`Loggin...`, 1)

//Connect to Discord Server
import EveConnError from ">/response/events/eve_conn_error"
Global.cli.login(Config.ApiKey.discord).catch(EveConnError.callback)
