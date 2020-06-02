import React, { Component } from 'react';
import MusicList from '../../components/MusicList'
class Recommend extends Component {
	constructor() {
		super()
		this.state = {
			recommendMusic: [],
			newMusic: [],
		}
		this.getRecommend = this.getRecommend.bind(this)
		this.getNew = this.getNew.bind(this)
	}
	componentDidMount() {
		this.$http.all([
			this.getRecommend(),
			this.getNew()
		]).then(this.$http.spread((res1, res2) => {
			this.setState({
				recommendMusic: res1.data.result,
				newMusic: res2.data.result
			})
		}))

	}
	getRecommend() {
		return this.$http.get("/personalized?limit=6")
	}
	getNew() {
		return this.$http.get("/personalized/newsong")
	}

	render() {
		let { recommendMusic, newMusic }  = this.state
		return (
			<div className="recommend">
				<div className="recommend-music">
					<p>推荐歌单</p>
					<ul>
						{
							recommendMusic.map(item => {
								return <li key={item.id}>
									<div className="img-box">
										<img src={item.picUrl} alt=""/>
									</div>
									<p>{item.name}</p>
								</li>
							})
						}
					</ul>
				</div>
				<div className="new-music">
					<p>最新音乐</p>
					<MusicList need={false} list={newMusic}></MusicList>
				</div>
			</div>
		);
	}
}

export default Recommend;
