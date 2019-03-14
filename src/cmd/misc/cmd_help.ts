import Command from ">/tools/command"

let cmd_help = new Command()
export default cmd_help

cmd_help.cmd = "help"
cmd_help.callback = (cli, msg, args) => {
  let txt: string = ""

  if (args.length == 0) {
    //Mostrar una guía general de los comandos disponibles
    txt += "Guía de Comandos: ```"
    txt += `&test    -> Comando de testeo del Bot [Solo puede ser ejecutado por el desarrollador].\n`
    txt += `&channel -> Configuración de los canales habilitados para el funcionamiento del Bot.\n`
    txt += `&money   -> Conversor de Divisas.\n\n`

    txt += `Para consultar por un comando específico:\n`
    txt += `-> &help [cmd]\n`
    txt += `   [cmd] = comando por el cual consultar`
    txt += "```"

  } else {
    //Guía específica para cada comando
    switch (args[0].toLowerCase()) {
      case "channel":
        txt += "Comando **&channel:** ```"
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
        txt += "Comando **&money:** ```"
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
        txt += "Comando **&test** ```"
        txt += `COMANDO UTILIZADO SOLO POR EL DESAROLLADOR PARA SUS PRUEBAS, de igual forma, solo el desarrolador del bot tiene acceso a este comando.`
        txt += "```"
        break

      default:
        txt += `Lo siento ` + msg.author + ", pero ese comando no existe. Ejecute `&help` para visualizar la guía de usuario."
        break
    }
  }

  //Detectar primer argumento
  msg.channel.send(txt)
}
