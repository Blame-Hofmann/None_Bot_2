import Command from ">/tools/command"
import Config from ">/config"

let cmd_help = new Command()
export default cmd_help

cmd_help.cmd = ["help", "hh"]
cmd_help.callback = (cli, msg, args) => {
  let txt: string = ""

  if (args.length == 0) {
    //Mostrar una guía general de los comandos disponibles
    txt += "Guía de Comandos: ```"
    txt += `Nota: su versión abreviada está entre corchetes "[]"...\n\n`

    txt += `&debug     -> [db] Utilidades disponibles para el desarrollador\n`
    txt += `&channel   -> [ch] Configuración de los canales habilitados para el funcionamiento del Bot.\n`
    txt += `&money     -> [mn] Conversor de Divisas.\n`
    txt += `&flip      -> [ff] Lanza una moneda.\n\n`

    txt += `Para consultar por un comando específico:\n`
    txt += `-> &help [cmd]\n`
    txt += `-> &hh [cmd]\n\n`

    txt += `En donde:\n`
    txt += `-> [cmd] = comando por el cual consultar`
    txt += "```"

  } else {
    //Guía específica para cada comando
    switch (args[0].toLowerCase()) {
      case "channel":
        txt += "Comando **&channel - &ch:** ```"
        txt += `Por defecto, cuando este bot es agregado al servidor, éste podrá escuchar los comandos en todos los canales a los cuales tiene acceso. `
        txt += `Para restringir los canales a los cuales el bot tiene acceso, éste funciona mediante una lista blanca (de ahora en adelante WhiteList), `
        txt += `la cual por defecto viene vacía. Cuando la WhiteList esté vacía, el bot podra escuchar la ejecución de comandos en todos los canales del servidor, `
        txt += `a menos que se agreguen canales a esta lista. El único usuario que tiene acceso a estos comandos son los Owners de sus respectivos servidores.\n\n`

        txt += `Para agregar uno o varios canales a la WhiteList, ejecute:\n`
        txt += `-> &channel add [#chann-1], [#chann-2], [#chann-3], [...]\n\n`

        txt += `Para quitar uno o varios canales de la WhiteList:\n`
        txt += `-> &channel del [#chann-1], [#chann-2], [#chann-3], [...]\n\n`

        txt += `Para agregar o quitar todos los canales de texto a la WhiteList:\n`
        txt += `-> &channel add all\n`
        txt += `-> &channel del all\n\n`
        txt += "```"

        break
      case "money":
        txt += "Comando **&money - &mn:** ```"
        txt += `Este comando permite realizar conversiones de divisas utilizando los montos actualizados desde un servidor externo el cual gestiona tales cambios. `
        txt += `La sintaxis del comando es la siguiente:\n\n`

        txt += `-> &money [valor] [moneda_1] a [moneda_2]\n\n`

        txt += `En donde:\n`
        txt += `-> [valor]    = Corresponde al monto que se desea transformar. Tanto el punto y la coma se interpreta como separadore de decimales.\n`
        txt += `-> [moneda_1] = Corresponde amoneda de origen en formato ISO (3 letras en mayúsculas).\n`
        txt += `-> [moneda_2] = Corresponde amoneda de origen en formato ISO (3 letras en mayúsculas).\n\n`

        txt += `Ejemplo:\n`
        txt += `-> &money 125.5 CLP a USD`
        txt += "```"
        break

      case "test":
        txt += "Comando **&debug - &dd:** ```"
        txt += `Funciones de depuración, disponibles únicamente para el desarrollador del bot, su sintaxis:\n`
        txt += `-> &debug [option] [arg_1] [arg_2] [arg_3] ... [arg_n]\n\n`

        txt += `En donde:\n`
        txt += `-> [option] = Subcomando a ejecutar.\n`
        txt += `-> [arg_??] = Argumentos.\n\n`

        txt += `Subcomandos disponibles:\n`
        txt += `-> kill      = Mata el proceso de ejecución del bot.\n`
        //txt += `-> recompile = Elimina toda la carpeta de compilación, recompila y vuelve a ejecutar al bot.\n`
        txt += `-> test      = Pruebas de funcionamiento y estado.`
        txt += "```"
        break

      case "flip":
        txt += "Comando **&flip - &ff:** ```"
        txt += `Lanza una moneda, el resultado será cara o sello, ideal para tomar decisiones binarias.`
        txt += "```"
        break

      default:
        txt += `Lo siento ` + msg.author + ", pero ese comando no existe. Ejecute `&help` para visualizar la guía de usuario."
        break
    }
  }

  txt = txt.replace(/&/gi, Config.Cmd.symbol)
  msg.channel.send(txt)
}
