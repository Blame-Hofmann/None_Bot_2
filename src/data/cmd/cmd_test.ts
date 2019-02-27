import Command from ">/tools/command"

let cmd_test = new Command()
export default cmd_test

cmd_test.cmd = "test"
cmd_test.callback = (cli, msg, args) => {
  msg.reply("testeado correctamente~")
}
