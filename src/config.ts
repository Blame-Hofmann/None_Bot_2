module Config {
  //API Keys used by the Bot
  export module ApiKey {
    export let discord = "INSERT_YOUR_DISCORD_API_KEY_HERE"
    export let Fixer = "INSERT_YOUR_FIXER_API_KEY_HERE"

  }

  //MySQL Configuration
  export module DB {
    export let host = "localhost"
    export let port = 8080
    export let user = "USERNAME"
    export let password = "PASSWORD"
    export let database = "none_bot_dev"

  }

  //General Bot Configuration
  export module Cmd {
    export let symbol = "&"
    export let id_dev = "INSERT_THE_DEV_ID_HERE"
    export let conn_sec = 5

  }
}
export default Config
