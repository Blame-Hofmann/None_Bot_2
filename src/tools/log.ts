import Moment from "moment";

export module Log {
    /**
     * Escribe una Línea en la consola con timestamp.
     * @param message Mensaje a imprimir.
     * @param type 1 = [ EV ] (evento); 2 = [ OK ] (sucess); 3 = [FAIL] (error); other = sin timestamp
     */
    export function writeLine(message: string, type: number = null): void {
        let strDate: string = "#" + Moment().format("hh:mm:ss")
        let strType: string

        switch (type) {
            case 1:
                strType = "[ EV ]"
                break
            case 2:
                strType = "[ OK ]"
                break
            case 3:
                strType = "[FAIL]"
                break
            default:
                strDate = "         "
                strType = "      "
                break
        }

        console.log(`${strDate} ${strType} -> ${message}`)
    }

    /**
     * Escribe una linea de separación.
     */
    export function writeSeparator(): void {
        console.log(`-----------------------------------------------------------------\n`)
    }

    /**
     * Limpia la Consola (es necesario por el @types de Node...)
     */
    export function clear(): void {
        let obj_console: any = console
        obj_console.clear()
    }
}

export default Log
