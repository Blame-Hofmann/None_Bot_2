import Command from ">/tools/command"

//Dev commands...
import cmd_test from ">/cmd/dev/cmd_test"
import cmd_kill from ">/cmd/dev/cmd_kill"

//Other commands Here!
import cmd_channel from ">/cmd/channel/cmd_channel"
import cmd_help from ">/cmd/misc/cmd_help"
import cmd_currency from ">/cmd/misc/cmd_currency"

//...and add your instances here:
let cmd_list: Array<Command> = [
  //dev commands
  cmd_test,
  cmd_kill,

  //Normal commands
  cmd_help,
  cmd_channel,
  cmd_currency
]
export default cmd_list
