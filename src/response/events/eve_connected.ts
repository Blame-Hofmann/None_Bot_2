import CliEvent from ">/tools/cli_event"
import Log from ">/tools/log"
import Global from ">/Global"

let EveConnected = new CliEvent()
export default EveConnected

EveConnected.name = [ "ready", "resume" ]
EveConnected.callback = () => {
  Log.writeLine("Connection Successfull :^)", 2)
  Log.writeLine("Listening...")
  Log.writeSeparator()

  clearTimeout(Global.conn_timer)
}
