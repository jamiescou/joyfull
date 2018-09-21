
import http from '../ajax'
import apiSetting from '../api'
let mainSer = {
  weatherApiSer: function (params, returnFuncction) { // 
    http.get(apiSetting.weatherApi + '?appId=null&key=null')
      .then((res) => {
        returnFuncction(res.data)
      })
  },
  robotApiSer: function (params, returnFuncction) { // 
    http.get(apiSetting.robotApi, params)
      .then((res) => {
        returnFuncction(res.data)
      })
  },
  baisibudeSer: function (params, returnFuncction) { // 
    http.get(apiSetting.baisibudejie, params)
      .then((res) => {
        returnFuncction(res.data)
      })
  }
}
export default mainSer
