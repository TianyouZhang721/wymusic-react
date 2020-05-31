import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import MapRoute from '../../routes/MapRoute'
class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <header>
                    <div className="home-header">
                        <span className="left">我的音乐我做主</span>
                        <span className="right">下载App</span>
                    </div>
                    <nav> 
                        <NavLink to="/home/recommend">推荐音乐</NavLink>
                        <NavLink to="/home/hot">热歌</NavLink>
                        <NavLink to="/home/search">搜索</NavLink>
                    </nav>
                </header>
                <main>
                    <MapRoute routes={this.props.routes} />
                </main>
            </div>
        );
    }
}

export default Home;
