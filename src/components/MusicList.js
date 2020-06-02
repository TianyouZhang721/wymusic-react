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
            flag: false,
            downFlag: false,
            upFlag: false,
            end: 30
        }
        this.renderList = this.renderList.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.list.length > 50) {
            let bs = new BScroll(".musiclist", {
                probeType: 2,
                click: true
            })
            let that = this
            bs.on("scroll", function(){
                if (this.y > that.refs.down.clientHeight) {
                    console.log("下拉刷新完全漏出来了")
                    that.setState({
                        downFlag: true
                    })
                } else {
                    that.setState({
                        downFlag: false
                    })
                }
                if (this.y < this.maxScrollY - that.refs.down.clientHeight) {
                    that.setState({
                        upFlag: true
                    })
                } else {
                    that.setState({
                        upFlag: false
                    })
                }
    
            })
            bs.on("scrollEnd", function() {
                if (that.state.downFlag) {
                    that.props.getData()
                }
                if (that.state.upFlag) {
                    let end  = that.state.end
                    end+=30
                    end = end > that.props.list.length ? that.props.list.length : end
                    that.setState({
                        end
                    }, () => {
                        
                    })
                }
            })
        } else {
            this.setState({
                flag: false
            })
        }
    }

    goPlay(id) {
        this.props.history.push("/play?id=" + id)
    }
    renderList(end) {
        return this.props.list.slice(0, end).map((item, index) => {
            return <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                { this.props.need && <span>{index + 1}</span> }
                <div>
                    <p className="songName">{item.name}</p>

                    {
                        (() => {
                            if(item.song) {
                                return  <p className="singerName">{item.song.artists[0].name} - {item.name}</p>
                            } else if(item.ar) {
                               return <p className="singerName">{item.ar[0].name} - {item.name}</p>
                            } else {
                              return  <p className="singerName">{item.artists[0].name} - {item.name}</p>
                            }
                        })()
                    }
                </div>
                <i className="iconfont icon-bofang"></i>
            </li>
        })
    }
    render() {
        let {downFlag, upFlag, end} = this.state
        let el = this.renderList(end)
        return (
            <div className="musiclist">
                <ul ref="ul">
                    {this.props.list.length > 50 && <p className="pullDown" ref="down">{downFlag ? '释放刷新' : '下拉刷新'}</p>}
                    
                    {
                        el
                        // list.map((item, index) => {
                        //     return <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                        //         { need && <span>{index + 1}</span> }
                        //         <div>
                        //             <p className="songName">{item.name}</p>
                        //             <p className="singerName">{item.song ? item.song.artists[0].name : item.ar[0].name} - {item.name}</p>
                        //         </div>
                        //         <i className="iconfont icon-bofang"></i>
                        //     </li>
                        // })
                    }
                    {
                        this.props.list.length > 50 && (end >= this.props.list.length ? <p className="pullUp">到底了！！</p> :<p className="pullUp">{upFlag ? "释放加载" : "上拉加载"}</p>)
                    }
                </ul>
            </div>
            
        )
    }
}
export default withRouter(MusicList)
