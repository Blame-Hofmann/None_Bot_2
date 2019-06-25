import Command from ">/tools/command"
import Global from ">/global"
import AjaxHTTPS from ">/tools/ajax_https"
import Config from ">/config"
import NumConv from ">/tools/num_conv"
import { Decimal } from "decimal.js"

let cmd_currency = new Command()
export default cmd_currency

cmd_currency.cmd = ["money", "mn"]
cmd_currency.callback = (msg, args) => {
  //If no parameters
  let txt_help: string = "Consulte `" + Config.Cmd.symbol + "help " + cmd_currency.cmd[0] + "` para más detalle~"
  if (args.length == 0) {
    msg.reply("Usted no ha ingresado ningún parámetro. " + txt_help)
    return
  } else if (args.length < 4) {
    msg.reply("Usted no ha ingresado correctamente los parámetros. " + txt_help)
    return
  }

  //If the number is not valid...
  let num_in: string = parseNum(args[0])
  if (num_in == null) {
    msg.reply("El valor ingresado `$ " + args[0] + "` no es válido. " + txt_help)
    return
  }

  //Making the options object
  let options = {
      from: parseStr(args[1]).toUpperCase(),
      to: parseStr(args[3]).toUpperCase(),
      amount: new Decimal(parseNum(num_in))
  }

  //Making the URL
  let strUrl: string = "https://shauna.website/currency.json"

  AjaxHTTPS.get(strUrl, (res, data: { [key: string]: number }) => {
    let converter =  {
      from: data[options.from],
      to: data[options.to]
    }

    //Notificar de alguna moneda que no exista
    let note: string = null
    if ((converter.from == null) || (converter.to == null)) {
      note = ""

      if (converter.from == null) {
        note += `Moneda 1 -> ${options.from}`
      }
      if (converter.to == null) {
        note += `\nMoneda 2 -> ${options.to}`
      }

      msg.reply(`Las siguientes monedas no existen dentro de la norma ISO:\n` + "```" + note + "```")
      return
    }

    //Realizar cálculos
    let numFrom = new Decimal(converter.from)
    let numTo = new Decimal(converter.to)

    let numValue = options.amount
    numValue = numValue.div(numFrom).mul(numTo)

    let strFrom: string = NumConv.formatNum(options.amount.toString(), 2)
    let strValue: string = NumConv.formatNum(numValue.toString(), 2)

    let strReply: string = ""
    strReply += 'La conversión dió como Resultado:\n'
    strReply += '```$ ' + strFrom + ' ' + options.from + ' => $ ' + strValue + ' ' + options.to + '```'

    msg.reply(strReply)
  }, () => {
    let strReply: string = ""
    strReply += `Lamentablemente hay un problema con la conexión con el servidor remoto de divisas.\n`
    strReply += `Se le notificará al desarrollador sobre dicho problema\n`

    msg.reply(strReply)
    Global.cli.fetchUser(Config.Cmd.id_dev).then(devMsg => {
        strReply  = msg.author + `, hay un problema con http://data.fixer.io/` + `\n`
        strReply += `de parte de ellos. Deberías revisar en cuanto antes ese problema...`

        devMsg.sendMessage(strReply)
    })
  })
}

let parseNum = (str: string) => {
  if (str.match(/(^[0-9]+$|^[0-9]+(\.|,)[0-9]+$)/gi) == null) {
    return null
  }

  let patt = str.replace(/,/gi, ".")
  let arr_m = patt.match(/[0-9]+/gi)

  if (arr_m == null) {
    patt = null
  } else {
    patt = ""
    arr_m.forEach((item, i) => {
      if (i > 0) {
        patt += "."
      }

      patt += item
    })
  }

  return patt
}
let parseStr = (str: string) => {
  let arr_str = str.match(/[a-z]+/gi)

  if (arr_str == null) {
    return "null"
  } else {
    return arr_str[0]
  }
}
