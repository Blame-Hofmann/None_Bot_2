import Command from ">/tools/command"

//Put your commands instances here..
import cmd_test from ">/cmd/misc/cmd_test"
import cmd_channel from ">/cmd/channel/cmd_channel"

//...and add your instances here:
let cmd_list: Array<Command> = [
  cmd_test,
  cmd_channel
]
export default cmd_list
