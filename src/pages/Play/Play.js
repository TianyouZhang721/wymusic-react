import React, { Component } from 'react';
import qs from 'querystring'
class Play extends Component {
    constructor() {
        super()
        this.state = {
            playStyle: {}, // 背景图的样式
            picUrl: "", // 圆圈的图片
            url: "", // 歌曲地址
            flag: true, // 控制按钮的显示与隐藏
        }
        this.getDetail = this.getDetail.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.getLyric = this.getLyric.bind(this)
    }
    getDetail(id) {
        return this.$http.get("/song/detail?ids=" + id)
    }
    getLyric(id) {
        return this.$http.get("/lyric?id=" + id)
    }
    getUrl(id) {
        return this.$http.get("/song/url?id=" + id)
    }
    componentDidMount() {
        console.log(this)
        let str = this.props.location.search.slice(1)
        let id = qs.parse(str).id
        // 一进入播放页面，我们需要同时调用3个接口
        this.$http.all([
            this.getDetail(id),
            this.getLyric(id),
            this.getUrl(id)
        ]).then(
            this.$http.spread((res1, res2, res3) => {
                console.log(res1)
                console.log(res2)
                console.log(res3)
                this.setState({
                    playStyle: {
                        background: `url(${res1.data.songs[0].al.picUrl}) no-repeat center center`,
                        backgroundSize: "150% 150%",
                        filter: "blur(10px)"
                    },
                    picUrl: res1.data.songs[0].al.picUrl,
                    url: res3.data.data[0].url
                })
            })
        )
    }
    play() {
        // 点击播放按钮   元素.paused  返回当前播放器是否暂停
        if (this.audio.paused) {
            // 说明是暂停状态
            this.audio.play()
            this.setState({
                flag: false
            })
        } else {
            this.audio.pause()
            this.setState({
                flag: true
            })
        }
    }
    render() {
        let { playStyle, picUrl, url, flag } = this.state
        return (
            <div className="play-box">
                <div className="bg-box"  style={ playStyle }></div>
                <div className="circle-box">
                    <div className="circle">
                        <div className={flag ? "img-box stop" : "img-box"}>
                            <img src={picUrl} alt=""/>
                        </div>
                        
                    </div>
                    {/* {
                        flag && <i className="iconfont icon-bofang" onClick={this.play.bind(this)}></i>
                    } */}
                    <i className={flag ? "iconfont icon-bofang" : "iconfont icon-bofang opa"} onClick={this.play.bind(this)}></i>
                </div>
                <audio src={url} ref={(audio) => {
                    this.audio = audio
                }}></audio>
            </div>
        );
    }
}

export default Play;
