import * as Discord from "discord.js"
import CliEvent from ">/tools/cli_event"
import driverCmd from ">/driver/driver_cmd"
import Global from ">/global"

let Message = new CliEvent()
export default Message

Message.name = [ "message" ]
Message.callback = (msg: Discord.Message) => {
  driverCmd(Global.cli, msg)
}
