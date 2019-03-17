import CliEvent from ">/tools/cli_event"
import Config from ">/config"
import Log from ">/tools/log"
import Global from ">/global"

let EveConnError = new CliEvent()
export default EveConnError

EveConnError.name = [ "error" ]
EveConnError.callback = () => {
  Log.writeLine("Lost Connection!!!", 3)
  Log.writeLine("Reconnecting in " + Config.Cmd.conn_sec + " sec. Please Wait...\n")

  clearTimeout(Global.conn_timer)
  Global.conn_timer = setTimeout(() => {
    Log.writeLine("Reconnecting...", 1)
    Global.cli.login(Config.ApiKey.discord).catch(EveConnError.callback)

  }, 1000 * Config.Cmd.conn_sec)
}
