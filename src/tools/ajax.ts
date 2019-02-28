import * as http from "http"

module Ajax {
  export let get = (url: string, callback: (msg: http.IncomingMessage, data: any) => void, error?: () => void) => {
    http.get(url, msg => {
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

        callback(msg, data)
      })
    }).on("error", () => {
      if (error != null) {
        error()
      }
    })
  }

  export let post = (url: string, options: http.RequestOptions, callback: (msg: http.IncomingMessage, data: any) => void, error?: () => void) => {
    http.get(url, options, msg => {
      let arr_byte: Buffer

      msg.on("data", chunk => {
        arr_byte += chunk
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

        callback(msg, data)
      })
    }).on("error", () => {
      if (error != null) {
        error()
      }
    })
  }
}
export default Ajax
