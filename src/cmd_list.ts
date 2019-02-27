import Command from ">/tools/command"

//Put your commands instances here..
import cmd_test from ">/cmd/cmd_test"
import cmd_text from ">/cmd/cmd_text"

//...and add your instances here:
let cmd_list: Array<Command> = [
  cmd_test,
  cmd_text
]
export default cmd_list
