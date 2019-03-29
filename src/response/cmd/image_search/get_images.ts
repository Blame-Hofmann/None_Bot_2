import GoogleImages from "google-images"
import * as https from "https"
import Log from ">/tools/log"
import Config from ">/config"

let get_images = (txt: string, page: number, callback: (urls: Array<string>) => void, fail?: (error: iGoogleError) => void) => {
  let seeker = new GoogleImages(Config.ApiKey.google.id, Config.ApiKey.google.apiKey)
  seeker.search(txt, {
    safe: "high",
    page: ((page - 1) * 10) + 1
  }).then(images => {
    let arr_url: Array<string> = []
    if (images.length == 0) {
      callback(arr_url)
      return
    }

    let i = 0
    let next = () => {
        let img = images[i]
        let regex = new RegExp(".+\\.(bmp|jpg|jpeg|gif|png)", "gi")
        let arr_str: Array<string> = img.url.match(regex)

        if (arr_str != null) {
          let url = arr_str[0]
          url = url.replace(/^http:\/\//gi, "https://")

          https.get(url, (res) => {
            if (res.statusCode == 200) {
              arr_url.push(url)
            } else {
            }

            trigger()
          }).on("error", () => {
            trigger()
          })
        } else {
          trigger()
        }
    }
    let trigger = () => {
      if (images.length - 1 == i) {
        callback(arr_url)
      } else {
        i += 1
        next()
      }
    }

    //Ejecutar el procesado de imágenes
    next()
  }).catch((error: iGoogleError) => {
    Log.writeLine("Google no pudo realizar la búsqueda de Imágenes.", 3)
    Log.writeLine(`[${error.statusCode}] - ${error.statusMessage}`)

    fail(error)
  })
}

interface iGoogleError {
  HTTPError: string;
  message: string;
  host: string;
  hostname: string;
  method: "GET" | "POST";
  path: string;
  statusCode: number;
  statusMessage: string;
}

export default get_images
