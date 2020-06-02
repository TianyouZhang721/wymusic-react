import React, { Component } from 'react'
// 如果当前组件不是路由组件，则this.props身上是没有history这些东西的
import {
    withRouter
} from 'react-router-dom'
import BScroll from 'better-scroll'
// new BScroll("父元素", {})
// 满足以下几个条件    1. 父元素嵌套子元素 2. 子元素只有一个根标签  3. 子元素的高度大于父元素的高度 4. 父元素必须添加overflow:hidden 
class MusicList extends Component {
    constructor() {
        super()
        this.state = {
            flag: false
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps)
    //     if (nextProps.list.length > 10) {
    //         this.setState({
    //             flag: true
    //         })
    //     } else {
    //         this.setState({
    //             flag: false
    //         })
    //     }
    // }
    componentDidMount() {
        new BScroll(".musiclist", {
            probeType: 2
        })
    }
    goPlay(id) {
        this.props.history.push("/play?id=" + id)
    }
    render() {
        let { list, need } = this.props
        return (
            <div className="musiclist">
                <ul ref="ul">
                    {
                        list.map((item, index) => {
                            return <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                                { need && <span>{index + 1}</span> }
                                <div>
                                    <p className="songName">{item.name}</p>
                                    <p className="singerName">{item.song ? item.song.artists[0].name : item.ar[0].name} - {item.name}</p>
                                </div>
                                <i className="iconfont icon-bofang"></i>
                            </li>
                        })
                    }
                </ul>
            </div>
            
        )
    }
}
export default withRouter(MusicList)
