
# Bot Discord

Este es un pequeño bot para Discord, solo trae funcionalidades básicas, por lo cual sirve como punto de partida para agregar nuevas funcionalidades

## Primeros pasos

Preparar el entorno de trabajo, después de clonar el repositorio.

### Actualizar dependencias de Node.js
Abrir una terminal en el directorio raiz del proyecto, y ejecutar el siguente comando:
```
npm update
```

### Configurar Archivo de Conexión
El archivo "/config.ts" es un módulo que contiene las llaves de conexión de nuetro bot. dentro de ese archivo encontramos lo siguiente
```
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
    export let database = "none_bot"

  }

  //General Bot Configuration
  export module Cmd {
    export let symbol = "&"
    export let id_dev = "INSERT_THE_DEV_ID_HERE"

  }
}
export default Config
```

A este archivo hay que asignarle sus llaves correspondientes:
* ApiKey.discord -> API Key del BotConn
* ApiKey.fixer -> API Key de [fixer.io](https://fixer.io/)
* symbol -> El símbolo por el cual el bot reconocerá los comandos.
* id_dev -> ID del controlador del bot (opcional solo para ciertos comandos que lo requieran)

El submódulo DB contiene las credenciales de acceso para la base de datos. Ahí deben de colocarse las credenciales que corresponden a su base de datos previamente configurada. Para crear la base de datos, ejecute en MySQL el script adjunto que se encuentra en la raiz del proyecto "MySQL DB Script".

## Ejecutar
Luego de realizar toda la configuración inicial, para ejecutar el bot basta con abrir el terminal en la carpeta raiz del proyecto, y ejecutar
```
npm start
```
