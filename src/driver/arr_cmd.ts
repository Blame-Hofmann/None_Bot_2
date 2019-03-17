import Command from ">/tools/command"

//Put commands Here!
import cmd_debug from ">/response/cmd/debug/cmd_debug"
import cmd_channel from ">/response/cmd/channel/cmd_channel"
import cmd_help from ">/response/cmd/misc/cmd_help"
import cmd_currency from ">/response/cmd/misc/cmd_currency"
import cmd_flip from ">/response/cmd/misc/cmd_flip"
import cmd_img_search from ">/response/cmd/image_search/cmd_img_search"

//...and add your instances here:
let arr_cmd: Array<Command> = [
  cmd_debug,
  cmd_channel,
  cmd_help,
  cmd_currency,
  cmd_flip,
  cmd_img_search
]
export default arr_cmd
