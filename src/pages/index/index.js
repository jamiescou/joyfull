import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import mainSer from '../../servers/main/index'

import { add, minus, asyncAdd } from '../../actions/counter'
import './index.less'
import test from '../../images/test.jpg'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
    state = {
      message: '',
      value: '',
      duanziList: [],
      curPage: 1,
      pageCount: 1,
      type: 29
    }
    config = {
    navigationBarTitleText: '沐风亭'
  }
  // getTalkForRobot () {
  //   let value = this.state.value
  //   let params = {
  //     showapi_appid: '61010', //这里需要改成自己的appid
  //     showapi_sign: '16ecee3d89d84ed2ad0f1c22fa5469be', 
  //     info: value,
  //     userid: 1
  //   }
  //   let that = this
  //   mainSer.robotApiSer(params, function (data) {
  //     that.setState({
  //       message: data.showapi_res_body.text
  //     });
  //   })
  // }
  // handleOnBlur () {
  //   this.getTalkForRobot()
  // }
  getInitData () {
    let that = this
    let {curPage, type, duanziList} = this.state
    let params = {
      showapi_appid: '61010', //这里需要改成自己的appid
      showapi_sign: '16ecee3d89d84ed2ad0f1c22fa5469be',
      type: type,
      page: this.state.curPage
    }
    mainSer.baisibudeSer(params, function (data) {
      let dataList = data.showapi_res_body.pagebean
      if (curPage > 1) {
        that.setState({
          duanziList: duanziList.concat(dataList.contentlist),
          pageCount: dataList.allPages
        })
        return
      }
      that.setState({duanziList: dataList.contentlist, pageCount: dataList.allPages})
    })
  }
  componentDidMount () {
    this.getInitData()
  }
  componentWillReceiveProps (nextProps) {

  }
  
  onScrolltolower () {
    console.log('ok')
    let {pageCount, curPage} = this.state
    if (curPage < pageCount){
      this.setState({
        curPage: curPage+1
      }, () => {
        this.getInitData()
      })
    }
  }
  onScroll (val) {
    // console.log(val)
  }
  // change (val) {
  //   this.setState({
  //     value: val
  //   })
  // }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    let {duanziList, type} = this.state
    return (
      <View className='index-box'>
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop='0'
        enableBackToTop={true}
        style='height: 700px'
        upperThreshold='20'
        onScrolltolower={this.onScrolltolower}
        onScroll={this.onScroll}
        >
        { duanziList.map((item) => (<View key={item.id} class="list-box">
            <View className="item-box">
              <Image className="content-box" mode style="width: 30px;height: 30px" src={item.profile_image} />
              <Text className="_name">{item.name}</Text>
              <Text className="_date_time">{item.create_time}</Text>
            </View>
            <View className="item_text">
              <Text className="item_name">{item.text}</Text>
            </View>
            {type === 41 ? <View className="video_box">
              <Video
                src={item.video_uri}
                controls={true}
                autoplay={false}
                poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                initialTime='0'
                id='video'
                loop={false}
                muted={false}
              />
            </View> : null }
        </View>))}
      </ScrollView>
      </View>
    )
  }
}

export default Index
