import React, { Component } from 'react';
import MusicList from '../../components/MusicList'
class Hot extends Component {
	constructor() {
		super()
		this.state = {
			hotList: []
		}
	}
	componentDidMount() {
		this.getData()
	}
	getData() {
		this.$http.get("/top/list?idx=1").then(res => {
			console.log(res)
			this.setState({
				hotList: res.data.playlist.tracks
			})
		})
	}
	render() {
		return (
			<div className="hot">
				<MusicList getData={this.getData.bind(this)} need={true} list={this.state.hotList}/>
			</div>
		);
	}
}

export default Hot;
