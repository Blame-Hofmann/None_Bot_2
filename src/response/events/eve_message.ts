import * as Discord from "discord.js"
import CliEvent from ">/tools/cli_event"
import driverCmd from ">/driver/driver_cmd"
import Global from ">/global"

let EveMessage = new CliEvent()
export default EveMessage

EveMessage.name = [ "message" ]
EveMessage.callback = (msg: Discord.Message) => {
  driverCmd(Global.cli, msg)
}
