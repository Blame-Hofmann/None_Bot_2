module Config {
  //API Keys Used by the Bot
  export module ApiKey {
    export let discord = "API_KEY_FROM_DISCORD_BOT"
    export let Fixer = "API_KEY_FROM_FIXER_FREE_ACCOUNT"

  }

  //MySQL Configuration
  export module DB {
    export let host = "localhost"
    export let port = 8080
    export let user = "USERNAME"
    export let password = "PASSWORD"
    export let database = "none_bot"

  }

  //General Bot Configuration
  export module Cmd {
    export let symbol = "&"

  }
}
export default Config
