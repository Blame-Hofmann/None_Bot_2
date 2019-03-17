import GoogleImages from "google-images"
import * as https from "https"
import Config from ">/config"

let get_images = (txt: string, page: number, callback: (urls: Array<string>) => void) => {
  let seeker = new GoogleImages(Config.ApiKey.google.id, Config.ApiKey.google.apiKey)
  seeker.search(txt, {
    safe: "off",
    page: 1
  }).then(images => {
    let arr_url: Array<string> = []
    let trigger = () => {
      callback(arr_url)
    }

    images.forEach((img, i) => {
      let regex = new RegExp(".+\\.(bmp|jpg|jpeg|gif|png)", "gi")
      let arr_str: Array<string> = img.url.match(regex)

      if (arr_str != null) {
        let url = arr_str[0]
        url = url.replace(/^http:\/\//gi, "https://")

        https.get(url, (res) => {
          if (res.statusCode == 200) {
            arr_url.push(url)

            if (images.length - 1 == i) {
              trigger()
            }
          }
        }).on("error", () => {
          if (images.length - 1 == i) {
            trigger()
          }
        })
      }
    })
  })
}

export default get_images
