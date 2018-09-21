import axios from 'axios'
let loadingInstance
axios.interceptors.request.use(config => {
  config.headers.mm_mall_token = window.$token || getLocationData('token')
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(config => {
  return config
}, error => {
  return Promise.resolve(error.response)
})
function stateErrorFn (status) {
  let message
  status = parseInt(status)
  switch (status) {
    case 400:
      message = '错误请求'
      break
    case 401:
      message = '未授权，请重新登录'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '请求错误,接口404'
      break
    case 405:
      message = '请求方法未允许'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器端出错'
      break
    case 501:
      message = '网络未实现'
      break
    case 502:
      message = '网络错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网络超时'
      break
    case 505:
      message = 'http版本不支持该请求'
      break
    default:
      message = '链接服务器失败'
  }
  if (message) {
    // MessageBox.alert(message, '温馨提示', {
    //   confirmButtonText: '确定'
    // })
    Toast.fail(message)
  }
}
function codeErrorFn (data) {
  let message
  let optionFn = function (data) {
    message = data.message
    alert(message)
  }
  optionFn(data)
}
function formatterDateTime() {
  var date=new Date()
  var month=date.getMonth() + 1
        var datetime = date.getFullYear()
                + ""// "年"
                + (month >= 10 ? month : "0"+ month)
                + ""// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate())
                + ""
                + (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours())
                + ""
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes())
                + ""
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
        return datetime;
    }

let ajaxMethod = ['get', 'post']
let api = {}
ajaxMethod.forEach((method) => {
  // 数组取值的两种方式
  api[method] = function (uri, data, config) {
    let getUri = 'https://route.showapi.com/' + uri
    // let postData = Object.assign(data, postMessage)
    let postData = data
    return new Promise(function (resolve, reject) {
      wx.request({
        url: getUri,
        data: data,
        header: {'content-type':'application/x-www-form-urlencoded'},
        method: 'POST', 
        success: function(res){
          resolve(res)
        },
        fail: function(err) {
          // fail
          reject(err)
        },
        complete: function() {
          // complete
        }
      })
    })
  }
})
export default api
