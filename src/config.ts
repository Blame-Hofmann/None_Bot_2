module Config {
  //Llaves de conexión que requiere la aplicación
  export module ApiKey {
    export let discord = "API_KEY_FROM_DISCORD_BOT"
    export let Fixer = "API_KEY_FROM_FIXER_FREE_ACCOUNT"

  }

  //Configuración de la conexión con MySQL
  export module DB {
    export let host = "localhost"
    export let port = 8080
    export let user = "USERNAME"
    export let password = "PASSWORD"
    export let database = "none_bot"

  }

  //Configuración General del Bot
  export module Cmd {
    export let cmd_symbol = "&"

  }
}
export default Config
