import mysql from "mysql"
import Config from ">/config"

export module db {
  let data_conn = Config.DB

  export interface iError {
    code: string,
    errno: number,
    sqlMessage: string,
    sqlState: string,
    fatal: boolean
  }

  export let makeQuestion = (
    name_sp: string,
    param: any,
    success: (data: any) => void,
    fail?: (error?: iError) => void,
    then?: () => void
  ) => {
    let connector = mysql.createConnection(data_conn)

    console.log(`>>>Conectando a Base de Datos`)
    connector.connect(err => {
      if (err != null) {
        let obj_err: iError = {
          code: err.code,
          errno: err.errno,
          sqlMessage: err.sqlMessage,
          sqlState: err.sqlState,
          fatal: err.fatal
        }

        console.log(`-> [FAIL] Conexión Fallida\n`)
        console.log(obj_err)
        console.log("--<>--\n")

        fail(obj_err)
        return
      } else {
        console.log(`-> [ OK ] Conexión Exitosa\n`)
      }

      //Armar la Querystring
      let str_query = `call ${name_sp}(`
      for (let i = 0; i < Object.keys(param).length; i++) {
        if (i > 0) {
          str_query += ", "
        }

        str_query += "?"
      }
      str_query += ")"

      //armar el array de Datos
      let arr_param: Array<any> = []
      Object.keys(param).forEach(key => {
        arr_param.push(param[key])
      })

      // console.log(`>>>Iniciando ejecución de SP`)
      // console.log(`SP    = "${str_query}"`)
      // console.log(`Param = "${arr_param}"\n`)

      //realizar consulta
      connector.query(str_query, arr_param, (err, val) => {
        if (err != null) {
          let obj_err: iError = {
            code: err.code,
            errno: err.errno,
            sqlMessage: err.sqlMessage,
            sqlState: err.sqlState,
            fatal: err.fatal
          }

          if (fail != null) {
            fail(obj_err)
          }

          if (then != null) {
            then()
          }
        } else {
          let obj_val = val[0]
          success(obj_val)

          if (then != null) {
            then()
          }
        }
      })
    })
  }
}
export default db
