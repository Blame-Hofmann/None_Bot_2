import Command from ">/tools/command"
import Ajax from ">/tools/ajax"
import Config from ">/config"
import NumConv from ">/tools/num_conv"

let cmd_currency = new Command()
export default cmd_currency

cmd_currency.cmd = "money"
cmd_currency.callback = (cli, msg, args) => {
  //If the number is not valid...
    let num_in: string = parseNum(args[0])
  if (num_in.split(".").length > 2) {
    msg.reply("el valor ingresado `$ " + args[0] + "` no es válido, no sea pendejo~")
    return
  }

  //Making the options object
  let options = {
      from: parseStr(args[1]).toUpperCase(),
      to: parseStr(args[3]).toUpperCase(),
      amount: parseFloat(num_in)
  }

  //Making the URL
  let strUrl: string = ""
  strUrl += "http://data.fixer.io/api/latest"
  strUrl += `?access_key=${Config.ApiKey.Fixer}`
  strUrl += `&symbols=${options.from},${options.to}`
  strUrl += `&format=1`

  Ajax.get(strUrl, (res, data) => {
    let numValue: number

    let objData = data.rates
    let numFrom: number
    let numTo: number

    console.log(objData)
    numFrom = objData[options.from]
    numTo = objData[options.to]

    if ((numFrom == null) || (numTo == null)) {
        let note = ""
        if (numFrom == null) {
          note += "Moneda 1 = " + options.from + "\n"
        }
        if (numTo == null) {
          note += "Moneda 2 = " + options.to + "\n"
        }

        msg.reply(`Las siguientes monedas no existen dentro de la norma ISO:\n` + "```" + note + "```")
    } else {
        numValue = options.amount
        numValue = numValue / numFrom
        numValue = numValue * numTo

        let strValue: string = NumConv.formatNum(numValue, 2)

        let strReply: string = ""
        strReply += 'la conversión dió como Resultado:\n'
        strReply += '```$ ' + NumConv.formatNum(options.amount, 2) + ' ' + options.from + ' => $ ' + strValue + ' ' + options.to + '```'

        msg.reply(strReply)
    }
  }, () => {
    let strReply: string = ""
    strReply += `Lamentablemente hay un problema con esos judíos del internet.\n`
    strReply += `No hemos podido conectarnos con los servidores que nos proveen de dicha\n`
    strReply += `información.`

    msg.reply(strReply)
    cli.fetchUser(Config.Cmd.id_dev).then(devMsg => {
        strReply  = `None, hay un problema con http://data.fixer.io/` + `\n`
        strReply += `de parte de ellos. Deberías revisar en cuanto antes ese problema...`

        devMsg.sendMessage(strReply)
    })
  })
}

let parseNum = (str: string) => {
  let patt = str.replace(/,/gi, ".")
  let arr_m = patt.match(/[0-9]+/gi)

  if (arr_m == null) {
    patt = "0.0.0"
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
