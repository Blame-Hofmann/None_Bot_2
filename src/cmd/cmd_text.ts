import Command from ">/tools/command"

let cmd_text = new Command()
export default cmd_text

cmd_text.cmd = "text"
cmd_text.callback = (cli, msg, args, text) => {
  let output = "```" + text + "```"
  msg.reply(`Su texto ingresado es el siguiente:\n` + output)
}
