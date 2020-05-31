import React, { Component } from 'react';
import qs from 'querystring'
class Play extends Component {
    constructor() {
        super()
        this.state = {
            playStyle: {}
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
                    }
                })
            })
        )
    }
    render() {
        let { playStyle } = this.state
        return (
            <div className="play-box">
                <div className="bg-box"  style={ playStyle }></div>
            </div>
        );
    }
}

export default Play;
