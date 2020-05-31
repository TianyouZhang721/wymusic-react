import React, { Component } from 'react'
// 如果当前组件不是路由组件，则this.props身上是没有history这些东西的
import {
    withRouter
} from 'react-router-dom'
class MusicList extends Component {
    goPlay(id) {
        this.props.history.push("/play?id=" + id)
    }
    render() {
        let { list } = this.props
        return (
            <ul>
                {
                    list.map(item => {
                        return <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                            <div>
                                <p className="songName">{item.name}</p>
                                <p className="singerName">{item.song.artists[0].name} - {item.name}</p>
                            </div>
                            <i className="iconfont icon-bofang"></i>
                        </li>
                    })
                }
            </ul>
        )
    }
}
export default withRouter(MusicList)
