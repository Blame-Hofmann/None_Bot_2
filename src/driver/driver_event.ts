import arr_event from "./arr_event"
import Global from ">/global"

let driverEvent = () => {
  arr_event.forEach(event => {
    event.exec(Global.cli)
  })
}
export default driverEvent
