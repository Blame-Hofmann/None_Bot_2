import CliEvent from ">/tools/cli_event"

//Add events Here
import EveConnected from ">/response/events/eve_connected"
import EveConnError from ">/response/events/eve_conn_error"
import EveMessage from ">/response/events/eve_message"
import EveChangeImg from ">/response/events/eve_change_img"

let arr_event: Array<CliEvent> = [
  EveConnected,
  EveConnError,
  EveMessage,
  EveChangeImg
]
export default arr_event
