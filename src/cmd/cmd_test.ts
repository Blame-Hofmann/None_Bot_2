import Command from ">/tools/command"

let cmd_test = new Command()
export default cmd_test

cmd_test.cmd = "test"
cmd_test.callback = (cli, msg, args) => {
  let quote: string = ""

  quote += "```"
  args.forEach((item, i) => {
    if (i > 0) {
      quote += `\n`
    }

    quote += `arg[${i}] = "${item}";`
  })
  quote += "```"

  if (args.length == 0) {
    let cmd = cmd_test.cmd
    msg.reply(`su comando ingresado es "${cmd}" y no ha ingresado parámetros`)
  } else {
    let cmd = cmd_test.cmd
    msg.reply(`su comando ingresado es "${cmd}" y éstos son sus parámetros:\n` + quote)
  }
}
