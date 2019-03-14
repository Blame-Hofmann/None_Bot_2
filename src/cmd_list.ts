import Command from ">/tools/command"

//Put your commands instances here..
import cmd_channel from ">/cmd/channel/cmd_channel"
import cmd_test from ">/cmd/misc/cmd_test"
import cmd_help from ">/cmd/misc/cmd_help"
import cmd_currency from ">/cmd/misc/cmd_currency"

//...and add your instances here:
let cmd_list: Array<Command> = [
  cmd_channel,
  cmd_test,
  cmd_help,
  cmd_currency
]
export default cmd_list
