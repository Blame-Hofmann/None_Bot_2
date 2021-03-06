import Command from ">/tools/command"
import Config from ">/config"

let cmd_help = new Command()
export default cmd_help

cmd_help.cmd = ["help", "hh"]
cmd_help.callback = (msg, args) => {
  let txt: string = ""

  if (args.length == 0) {
    //Mostrar una guía general de los comandos disponibles
    txt += "Guía de Comandos: ```"
    txt += `Nota: su versión abreviada está entre corchetes "[]"...\n\n`

    txt += `&debug     -> [db] Utilidades disponibles para el desarrollador\n`
    txt += `&channel   -> [ch] Configuración de los canales habilitados para el funcionamiento del Bot.\n`
    txt += `&money     -> [mn] Conversor de Divisas.\n`
    txt += `&flip      -> [ff] Lanza una moneda.\n`
    txt += `&image     -> [im] Realiza una búsqueda de imágenes.\n`
    txt += `&avatar    -> [av] Muestra tu avatar o el avatar de alguien más.\n`
    txt += `&purge     -> [pg] Elimina todos los mensajes de los usuarios citados en los canales citados.\n\n`

    txt += `Para consultar por un comando específico:\n`
    txt += `-> &help [cmd]\n`
    txt += `-> &hh [cmd]\n\n`

    txt += `En donde:\n`
    txt += `-> [cmd] = comando por el cual consultar`
    txt += "```"

  } else {
    //Guía específica para cada comando
    switch (args[0].toLowerCase()) {
      case "ch":
      case "channel":
        txt += "Comando **&channel - &ch:** ```"
        txt += `Por defecto, cuando este bot es agregado al servidor, éste podrá escuchar los comandos en todos los canales a los cuales tiene acceso. `
        txt += `Para restringir los canales a los cuales el bot tiene acceso, éste funciona mediante una lista blanca (de ahora en adelante WhiteList), `
        txt += `la cual por defecto viene vacía. Cuando la WhiteList esté vacía, el bot podra escuchar la ejecución de comandos en todos los canales del servidor, `
        txt += `a menos que se agreguen canales a esta lista. El único usuario que tiene acceso a estos comandos son los Owners de sus respectivos servidores.\n\n`

        txt += `Para agregar uno o varios canales a la WhiteList, ejecute:\n`
        txt += `-> &channel add [#chann-1], [#chann-2], [#chann-3], [...]\n\n`
        txt += `-> &ch add [#chann-1], [#chann-2], [#chann-3], [...]\n\n`

        txt += `Para quitar uno o varios canales de la WhiteList:\n`
        txt += `-> &channel del [#chann-1], [#chann-2], [#chann-3], [...]\n\n`
        txt += `-> &ch del [#chann-1], [#chann-2], [#chann-3], [...]\n\n`

        txt += `Para agregar o quitar todos los canales de texto a la WhiteList:\n`
        txt += `-> &channel add all\n`
        txt += `-> &channel del all\n\n`
        txt += `-> &ch add all\n`
        txt += `-> &ch del all\n\n`
        txt += "```"

        break

      case "mn":
      case "money":
        txt += "Comando **&money - &mn:** ```"
        txt += `Este comando permite realizar conversiones de divisas utilizando los montos actualizados desde un servidor externo el cual gestiona tales cambios. `
        txt += `La sintaxis del comando es la siguiente:\n\n`

        txt += `-> &money [valor] [moneda_1] a [moneda_2]\n`
        txt += `-> &mn [valor] [moneda_1] a [moneda_2]\n\n`

        txt += `En donde:\n`
        txt += `-> [valor]    = Corresponde al monto que se desea transformar. Tanto el punto y la coma se interpreta como separadore de decimales.\n`
        txt += `-> [moneda_1] = Corresponde amoneda de origen en formato ISO (3 letras en mayúsculas).\n`
        txt += `-> [moneda_2] = Corresponde amoneda de origen en formato ISO (3 letras en mayúsculas).\n\n`

        txt += `Ejemplo:\n`
        txt += `-> &money 125.5 CLP a USD\n`
        txt += `-> &mn 125.5 CLP a USD`
        txt += "```"
        break

      case "db":
      case "debug":
        txt += "Comando **&debug - &dd:** ```"
        txt += `Funciones de depuración, disponibles únicamente para el desarrollador del bot, su sintaxis:\n`
        txt += `-> &debug [option] [arg_1] [arg_2] [arg_3] ... [arg_n]\n`
        txt += `-> &db [option] [arg_1] [arg_2] [arg_3] ... [arg_n]\n\n`

        txt += `En donde:\n`
        txt += `-> [option] = Subcomando a ejecutar.\n`
        txt += `-> [arg_??] = Argumentos.\n\n`

        txt += `Subcomandos disponibles:\n`
        txt += `-> kill      = Mata el proceso de ejecución del bot.\n`
        //txt += `-> recompile = Elimina toda la carpeta de compilación, recompila y vuelve a ejecutar al bot.\n`
        txt += `-> test      = Pruebas de funcionamiento y estado.`
        txt += "```"
        break

      case "ff":
      case "flip":
        txt += "Comando **&flip - &ff:** ```"
        txt += `Lanza una moneda, el resultado será cara o sello, ideal para tomar decisiones binarias.`
        txt += "```"
        break

      case "im":
      case "image":
        txt += "Comando **&image - &im:** ```"
        txt += `Realiza una búsqueda de imágenes en Google, se utiliza de la siguiente forma:\n\n`
        txt += `-> &image [lo_que_sea]\n`
        txt += `-> &im [lo_que_sea]\n\n`

        txt += "En donde:\n"
        txt += "-> [lo_que_sea] -> Palabras claves con las cuales realizar la búsqueda."
        txt += "```"
        break

      case "av":
      case "avatar":
        txt += "Comando **&avatar - &av:** ```"
        txt += `Muestra tu propio avatar, o muestra el avatar del usuario citado.\n\n`

        txt += "Ejemplo:\n"
        txt += "-> &avatar [usuario?]\n"
        txt += "-> &av [usuario?]\n\n"

        txt += "En donde:\n"
        txt += "-> [usuario?] -> Citar al usuario citado (opcional).\n\n"

        txt += "Ejemplo:\n"
        txt += "-> &avatar\n"
        txt += "-> &av\n"
        txt += "-> &avatar @user\n"
        txt += "-> &av @user\n"
        txt += "```"
        break

      case "pg":
      case "purge":
        txt += "Comando **&purge - &pg:** ```"
        txt += `Elimina todos los mensajes de todos los usuarios citados, en todos los canales\n`
        txt += `también citados. Solo los usuarios con permisos para Administrar Mensajes\n`
        txt += `pueden usar este comando.\n\n`

        txt += "Ejemplo:\n"
        txt += "-> &purge [usuario/s] [...] [canal/es] [...]\n"
        txt += "-> &pg [usuario/s] [...] [canal/es] [...]\n\n"

        txt += "En donde:\n"
        txt += "-> [usuario/s] -> Citar al usuario o los usuarios.\n"
        txt += "-> [canal/es]  -> Citar al canal o canales a limpiar.\n\n"

        txt += "Ejemplo:\n"
        txt += "-> &purge @usuario #canal\n"
        txt += "-> &pg @usuario #canal\n"
        txt += "-> &purge @usuario_1 @usuario_2 #canal-1 #canal-2\n"
        txt += "-> &pg @usuario_1 @usuario_2 #canal-1 #canal-2\n"
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
