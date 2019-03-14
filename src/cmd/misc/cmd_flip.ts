import Command from ">/tools/command"

let cmd_flip = new Command()
export default cmd_flip

cmd_flip.cmd = "flip"
cmd_flip.callback = (cli, msg) => {
  let percent: number = Math.floor((Math.random() * 100))
  let flip : boolean = null
  let txt: string = "Ha lanzado la moneda!!!\n"

  if (percent <= 49) {
    txt += "Salió cara!!! :smile: :sunglasses: :heart_eyes:"
  } else if (percent >= 51) {
    txt += "Salió sello!!! :smile: :open_mouth: :laughing:"
  } else {
    txt += "La moneda quedó de pie... :poop: :rolling_eyes: :sob:"
  }

  msg.reply(txt)
}
