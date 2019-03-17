import CliEvent from ">/tools/cli_event"
import Log from ">/tools/log"
import Global from ">/Global"

let Connected = new CliEvent()
export default Connected

Connected.name = [ "ready", "resume" ]
Connected.callback = () => {
  Log.writeLine("Connection Successfull :^)", 2)
  Log.writeLine("Listening...")
  Log.writeSeparator()

  clearTimeout(Global.conn_timer)
}
