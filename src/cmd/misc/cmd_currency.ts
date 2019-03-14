import Command from ">/tools/command"
import Ajax from ">/tools/ajax"
import Config from ">/config"
import NumConv from ">/tools/num_conv"
import { Decimal } from "decimal.js"

let cmd_currency = new Command()
export default cmd_currency

cmd_currency.cmd = "money"
cmd_currency.callback = (cli, msg, args) => {
  //If the number is not valid...
  let num_in: string = parseNum(args[0])
  if (num_in == null) {
    msg.reply("El valor ingresado `$ " + args[0] + "` no es válido, no sea pendejo~")
    return
  }

  //Making the options object
  let options = {
      from: parseStr(args[1]).toUpperCase(),
      to: parseStr(args[3]).toUpperCase(),
      amount: new Decimal(parseNum(num_in))
  }

  //Making the URL
  let strUrl: string = ""
  strUrl += "http://data.fixer.io/api/latest"
  strUrl += `?access_key=${Config.ApiKey.Fixer}`
  strUrl += `&symbols=${options.from},${options.to}`
  strUrl += `&format=1`

  Ajax.get(strUrl, (res, data) => {
    if (data.success == false) {
      let error_msg = "En estos momentos tenemos problemas con el servidor proveedor de información de divisas. "
      error_msg += "Me contactaré con el desarrollador para que solucione dicho problema."

      msg.reply(error_msg)
      error_msg = "Tenemos problemas con https://fixer.io/, he aquí los detalles ```"
      error_msg += `Código: ${data.error.code}\n\n`
      error_msg += `Descripción: ${data.error.code}` + "```"

      cli.fetchUser(Config.Cmd.id_dev).then(user => {
        user.send(error_msg)
      }, () => {
        msg.reply("Lamentablemente no me puedo comunicar con el desarrollador :sob:")
      })
    }

    let objData = (() => {
      if (data.rates != null) {
        return data.rates
      } else {
        let nullable: any = {}
        nullable[options.from] = null
        nullable[options.to] = null

        return nullable
      }
    })()
    let ref = {
      from: objData[options.from],
      to: objData[options.to]
    }

    //En caso de que alguna de las divisas no exista
    if ((ref.from == null) || (ref.to == null)) {
        let note = ""
        if (ref.from == null) {
          note += "Moneda 1 = " + options.from + "\n"
        }
        if (ref.to == null) {
          note += "Moneda 2 = " + options.to + "\n"
        }

        msg.reply(`Las siguientes monedas no existen dentro de la norma ISO:\n` + "```" + note + "```")
    } else {
      //Calculos...
      let numFrom = new Decimal(ref.from)
      let numTo = new Decimal(ref.to)

      let numValue = options.amount
      numValue = numValue.div(numFrom).mul(numTo)

      let strFrom: string = NumConv.formatNum(options.amount.toString(), 2)
      let strValue: string = NumConv.formatNum(numValue.toString(), 2)

      let strReply: string = ""
      strReply += 'La conversión dió como Resultado:\n'
      strReply += '```$ ' + strFrom + ' ' + options.from + ' => $ ' + strValue + ' ' + options.to + '```'

      msg.reply(strReply)
    }
  }, () => {
    let strReply: string = ""
    strReply += `Lamentablemente hay un problema con la conexión con el servidor remoto de divisas.\n`
    strReply += `Se le notificará al desarrollador sobre dicho problema\n`

    msg.reply(strReply)
    cli.fetchUser(Config.Cmd.id_dev).then(devMsg => {
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
