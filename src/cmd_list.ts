import Command from ">/tools/command"

//Put commands Here!
import cmd_debug from ">/cmd/debug/cmd_debug"
import cmd_channel from ">/cmd/channel/cmd_channel"
import cmd_help from ">/cmd/misc/cmd_help"
import cmd_currency from ">/cmd/misc/cmd_currency"
import cmd_flip from ">/cmd/misc/cmd_flip"

//...and add your instances here:
let cmd_list: Array<Command> = [
  cmd_debug,
  cmd_channel,
  cmd_help,
  cmd_currency,
  cmd_flip
]
export default cmd_list
