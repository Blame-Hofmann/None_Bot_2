module NumConv {
    /**
     * Transforma un número en una cadena con separadores de miles "." y coma decimal ",".
     * @param num Número de entrada, si el valor es NULL devolverá "-".
     * @param cantDec Cantidad de decimales a mostrar.
     */
    export let formatNum = (num:string | number, cantDec: number = null) => {
        if (num == null) {
            return "-"
        }
        let arrRaw = `${parseFloat(`${num}`)}`.split(".")
        let strOut = ""
        //arrRaw[0] = enteros
        //arrRaw[1] = decimales
        let arrEnt = `${arrRaw[0]}`.split("");
        for (let i = arrEnt.length - 1; i >= 0; i--) {
            strOut = `${arrEnt[i]}${strOut}`
            let reverse = (arrEnt.length) - i
            if ((i != 0) && (i != arrEnt.length - 1) && ((reverse % 3) == 0)) {
                strOut = `.${strOut}`
            }
        }
        //Devolver sin decimales
        if (cantDec == 0) {
            return strOut
        }
        if (arrRaw[1] == null) {
            arrRaw.push("")
        }
        if (cantDec == null) {
            if (arrRaw[1].length > 0) {
                strOut = `${strOut},`
                strOut = `${strOut}${arrRaw[1]}`
            }
            return strOut
        }
        if (cantDec >= arrRaw[1].length) {
            //Concatenar ceros
            strOut = `${strOut},${arrRaw[1]}`
            for (let i = arrRaw[1].length; i < cantDec; i++) {
                strOut = `${strOut}0`
            }
        }
        else {
            //concatenar hasta que se alcance la cantidad indicada
            strOut = `${strOut},`
            let arrDec = arrRaw[1].split("")
            arrDec.forEach((item, i) => {
                if ((i + 1) > cantDec) {
                    return
                }
                strOut = `${strOut}${item}`
            })
        }
        return strOut
    }
}

export default NumConv
