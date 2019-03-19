module Config {
  //API Keys used by the Bot
  export module ApiKey {
    export const discord = "INSERT_YOUR_DISCORD_API_KEY_HERE"
    export const fixer = "INSERT_YOUR_FIXER_API_KEY_HERE"
    export const google = {
      apiKey: "INSERT_YOUR_GOOGLE_CUSTOM_SEARCH_API_KEY_HERE",
      id: "INSERT_YOUR_GOOGLE_CUSTOM_SEARCH_ID_HERE"
    }

  }

  //MySQL Configuration
  export module DB {
    export const host = "localhost"
    export const port = 8080
    export const user = "USERNAME"
    export const password = "PASSWORD"
    export const database = "none_bot_dev"

  }

  //General Bot Configuration
  export module Cmd {
    export const symbol = "&"
    export const id_dev = "INSERT_THE_DEV_ID_HERE"
    export const conn_sec = 5

  }
}
export default Config
