import * as http from "http"

module Ajax {

  let fnCallback: (msg: http.IncomingMessage, data: any) => void

  //Función que arma los datos a ejecutar
  let makeRequest = (msg: http.IncomingMessage) => {
    let arr_byte: string | Buffer = null

    msg.on("data", chunk => {
      if (arr_byte == null) {
        arr_byte = chunk
      } else {
        arr_byte += chunk
      }
    })

    msg.on("end", () => {
      let data: any
      if (Buffer.isBuffer(arr_byte) == true) {
        data = arr_byte.toString("utf8")
      } else {
        data = arr_byte
      }

      try {
        data = JSON.parse(data)
      } catch (err) {
      }

      fnCallback(msg, data)
    })
  }

  export let get = (url: string, callback: (msg: http.IncomingMessage, data: any) => void, error?: (err?: Error) => void) => {
    fnCallback = callback
    http.get(url, makeRequest).on("error", (err) => {
      if (error != null) {
        error(err)
      }
    })
  }

  export let post = (url: string, callback: (msg: http.IncomingMessage, data: any) => void, error?: (err?: Error) => void) => {
    let options: http.RequestOptions = {}
    options.method = "POST"

    fnCallback = callback
    http.get(url, options, makeRequest).on("error", (err) => {
      if (error != null) {
        error(err)
      }
    })
  }
}
export default Ajax
