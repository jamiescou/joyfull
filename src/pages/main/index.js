import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
// import { connect } from '@tarojs/redux'

// import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'
import image from '../../images/yindao.jpg'
import image1 from '../../images/yindao1.jpg'
import image2 from '../../images/yindao2.jpg'


// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
class Index extends Component {
  config = {
    // navigationBarTitleText: '引导页'
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  goToIndex () {
    Taro.redirectTo({
      url: '/pages/main/index'
    })
  }

  render () {
    return (
      <View className='index-box'>
        <Text className="iconfont icon-tianqi weather—icon" />
        
      </View>
    )
  }
}

export default Index
