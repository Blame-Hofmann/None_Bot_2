
# Bot Discord

Este es un bot para Discord, el cual contiene diversos comandos de todo tipo para ser usados en dicha plataforma. El proyecto está en su fase inicial, por lo cual en este momento posee poquísimos comandos.

## Primeros pasos

Después de clonar el repositorio, debemos de realizar algunas configuraciones previas. Como punto de partida, necesitaremos tener instalado MySQL y node.

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
```

A este archivo hay que asignarle sus llaves correspondientes:
* ApiKey.discord -> API Key de nuestro Bot.
* ApiKey.fixer   -> API Key de [fixer.io](https://fixer.io/).

También se pueden configurar aspectos propios del funcionamiento del bot:
* symbol         -> El símbolo por el cual el bot reconocerá los comandos.
* id_dev         -> ID del controlador del bot (opcional solo para ciertos comandos que lo requieran).
* conn_sec       -> Tiempo de espera (segundos) para reconectar.

## Base de Datos
El submódulo DB contiene las credenciales de acceso para la base de datos. Ahí deben de colocarse las credenciales que corresponden a su base de datos previamente configurada. Para crear la base de datos, ejecute en MySQL el script adjunto que se encuentra en la raiz del proyecto "MySQL DB Script".

El usuario que se desee utilizar para que el bot pueda conectarse a él, requiere de utilizar el antiguo sistema de contraseñas, por lo cual crearemos un nuevo usuario con el anterior sistema de contraseñas con la siguiente query:
```
CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';
```
En donde:
* username -> Usuario que se desea crear.
* password -> Contraseña para dicho usuario.

## Ejecutar
Luego de realizar toda la configuración inicial, para ejecutar el bot basta con abrir el terminal en la carpeta raiz del proyecto, y ejecutar
```
npm start
```
