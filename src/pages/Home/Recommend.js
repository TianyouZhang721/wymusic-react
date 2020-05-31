import React, { Component } from 'react';

class Recommend extends Component {
	constructor() {
		super()
		this.state = {
			recommendMusic: [],
			newMusic: []
		}
		this.getRecommend = this.getRecommend.bind(this)
		this.getNew = this.getNew.bind(this)
	}
	componentWillMount() {
		// this.$http.get("/personalized?limit=6").then(res => {
		// 	this.setState({
		// 		recommendMusic: res.data.result
		// 	})

		// })
		// this.$http.get("/personalized/newsong").then(res => {
		// 	this.setState({
		// 		newMusic: res.data.result
		// 	})
		// })
		this.$http.all([
			this.getRecommend(),
			this.getNew()
		]).then(this.$http.spread((res1, res2) => {
			console.log(res1)
			console.log(res2)
			this.setState({
				recommendMusic: res1.data.result,
				newMusic: res2.data.result
			})
		}))


		// this.$http.all([
		// 	方法1,
		// 	方法2
		// ]).then(this.$http.spread((res1, res2) => {

		// }))
	}
	getRecommend() {
		return this.$http.get("/personalized?limit=6")
	}
	getNew() {
		return this.$http.get("/personalized/newsong")
	}
	render() {
		console.log("render")
		let { recommendMusic }  = this.state
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
				<div className="new-music"></div>
			</div>
		);
	}
}

export default Recommend;
