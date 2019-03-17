import CliEvent from ">/tools/cli_event"

//Add events Here
import Connected from ">/response/events/connected"
import ConnError from ">/response/events/conn_error"
import Message from ">/response/events/message"

let arr_event: Array<CliEvent> = [
  Connected,
  ConnError,
  Message
]
export default arr_event
