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
            songName: "",
            singerName: "",
            timeArr: [], // 时间数组
            lyricArr: [], // 歌词数组
            heightArr: [], //所有li的高度数组
            ulStyle: {}, // ul的样式
            ind: 0, // 当前歌词所对应的下标
            duration: 0, // 当前音乐总时长
            currentTime: 0, // 当前音乐进度
            width: 0,
        }
        this.getDetail = this.getDetail.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.getLyric = this.getLyric.bind(this)
        this.computedHeight = this.computedHeight.bind(this)
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
        let str = this.props.location.search.slice(1)
        let id = qs.parse(str).id
        // 一进入播放页面，我们需要同时调用3个接口
        this.$http.all([
            this.getDetail(id),
            this.getLyric(id),
            this.getUrl(id)
        ]).then(
            this.$http.spread((res1, res2, res3) => {
  
                var lyric = res2.data.lrc.lyric// 歌词字符串
                var arr = lyric.split(/\n/)
                // 分出两个数组，一个存时间，一个存歌词
                let timeArr = arr.map(item => {
                    return item.slice(1, 10)
                })
                // 把时间都转成以秒为单位
                timeArr = timeArr.map(item => {
                    let a = item.split(":")
                    return parseInt(a[0]) * 60 + parseFloat(a[1])
                })
                let lyricArr = arr.map(item => {
                    return item.slice(11)
                })
                this.setState({
                    playStyle: {
                        background: `url(${res1.data.songs[0].al.picUrl}) no-repeat center center`,
                        backgroundSize: "150% 150%",
                        filter: "blur(10px)"
                    },
                    picUrl: res1.data.songs[0].al.picUrl,
                    url: res3.data.data[0].url,
                    songName: res1.data.songs[0].al.name,
                    singerName: res1.data.songs[0].ar[0].name,
                    timeArr,
                    lyricArr
                }, () => {
                    this.computedHeight()
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

    // 当前音乐正在播放，播放进度会更新
    timeUpdate() {
        // 获取到当前音乐播放到什么时间了,单位为秒
        let currentTime = this.audio.currentTime
        let {timeArr, heightArr, lyricArr} = this.state
        let i = timeArr.findIndex((item, index) => {
            return currentTime > item && currentTime < timeArr[index + 1]
        })
        // 最终效果让下标为i的这个歌词漏出来，ul要向上去移动，移动多少？？
        // 就是这句歌词对应的li之前的所有li的高度之和
        if (i == -1) i = 0
        if (!lyricArr[i]) {
            i -= 1
        }
        // 这句歌词前所有li的高度和
        let sum = 0
        heightArr.forEach((item, index) => {
            if (index < i) {
                sum += item
            }
        })
        let fs = parseInt(document.documentElement.style.fontSize)

        // 计算真实进度条宽度
        // 当前音乐进度    =   进度条宽度
        // 当前音乐总时长  =    进度条总宽度
        let width = this.audio.currentTime / this.audio.duration * this.refs.progress.clientWidth
        console.log(width)
        this.setState({
            ulStyle: {
                marginTop: -(sum / fs) + 'rem'
            },
            ind: i,
            currentTime: this.timeFormat(currentTime),
            width: width / fs + 'rem'
        })
    }
    // 计算所有li的高度，放到一个数组内
    computedHeight() {
        let ul = this.refs.ul
        let lis = [...ul.children]
        let arr = []
        lis.forEach(item => {
            arr.push(item.clientHeight)
        })
        this.setState({
            heightArr: arr
        })
    }
    canPlayThough() {
        this.setState({
            duration: this.timeFormat(this.audio.duration)
        })
    }
    timeFormat(time) {
        // 198 => 03:18
        let min = Math.floor(time / 60)
        let sec = time % 60
        min = min < 10 ? "0" + min : min
        sec = sec < 10 ? "0" + parseInt(sec) : parseInt(sec)
        return `${min}:${sec}`
    }
    clickProgress(e) {
        let fs = parseInt(document.documentElement.style.fontSize)
        console.log(e.clientX)
        let x = e.clientX - this.refs.span.clientWidth
        console.log(x)
        this.setState({
            width: x / fs + 'rem'
        })
        // 2. 让音乐跳到对应位置
        // 当前音乐进度    =   进度条宽度
        // 当前音乐总时长  =    进度条总宽度
        this.audio.currentTime = x / this.refs.progress.clientWidth * this.audio.duration
    }
    move(e) {
        this.audio.pause()
        let fs = parseInt(document.documentElement.style.fontSize)

        // 1. 让球 和 进度条宽度跟着手指移动 改width
        // 手指在当前页面的横坐标 单位为px
        let x = e.touches[0].clientX - this.refs.span.clientWidth
        console.log(x)
        this.setState({
            width: x / fs + 'rem'
        })
        // 2. 让音乐跳到对应位置
        // 当前音乐进度    =   进度条宽度
        // 当前音乐总时长  =    进度条总宽度
        this.audio.currentTime = x / this.refs.progress.clientWidth * this.audio.duration
        // 3. 歌词也跳到对应的位置
    }
    end() {
        this.play()
    }
    render() {
        let { playStyle, picUrl, url, flag, songName, singerName, lyricArr, ulStyle, ind, duration, currentTime, width } = this.state
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
                <div className="lyric-box">
                    <p>{songName} - 
                        <span>{singerName}</span>
                    </p>
                    <div className="box">
                        <ul ref="ul" style={ ulStyle }>
                            {
                                lyricArr.map((item, index) => {
                                    return <li className={index == ind ? 'active' : ''} key={index}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="progress-box" ref="progress">
                    <span ref="span">{currentTime}</span>
                    <div className="long-box">
                        <div className="truth-progress" style={ {width: width} } onClick={this.clickProgress.bind(this)}></div>
                        <div 
                        className="circle" 
                        style={{left: width}}
                        onTouchMove={this.move.bind(this)}
                        onTouchEnd={this.end.bind(this)}
                        ></div>
                    </div>
                    <span>{duration}</span>
                </div>
                {/* 当前音乐播放进度 / 当前音乐总时长 = 真实进度条宽度 / 进度条总宽度 */}
                <audio src={url} ref={(audio) => {
                    this.audio = audio
                }}
                    onTimeUpdate={this.timeUpdate.bind(this)}
                    onCanPlayThrough={this.canPlayThough.bind(this)}
                ></audio>
            </div>
        );
    }
}

export default Play;
