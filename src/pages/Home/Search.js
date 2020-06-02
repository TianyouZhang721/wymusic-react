import React, { Component } from 'react';
import MusicList from '../../components/MusicList'
class Search extends Component {
	constructor() {
		super()
		this.state = {
			flag: false, // 输入框内有没有内容
			searchVal: "",
			searchList: [],
			hots: [],
			arr: JSON.parse(localStorage.getItem("history")) || []
		}
	}
	componentDidMount() {
		this.$http.get("/search/hot").then(res => {
			console.log(res)
			this.setState({
				hots: res.data.result.hots
			})
		})
	}
	searchChange(e) {
		this.setState({
			searchVal: e.target.value,
			flag: true
		})
		if (!e.target.value) {
			this.setState({
				flag: false
			})
			return
		}
		// if (e)
		
	}
	clickTag(str) {
		this.setState({
			searchVal: str
		}, () => {
			this.$http.get("/search?keywords=" + str).then(res => {
				console.log(res)
				this.setState({
					searchList: res.data.result.songs,
					flag: true
				})
			})
		})
	}
	cancel() {
		this.setState({
			flag: false,
			searchVal: ""
		})
	}
	keydown(e) {
		console.log(e.target.value)
		if (e.keyCode == 13) {
			let arr = this.state.arr
			arr.push(this.state.searchVal)
			localStorage.setItem("history", JSON.stringify(arr))
			this.$http.get("/search?keywords=" + this.state.searchVal).then(res => {
				console.log(res)
				this.setState({
					searchList: res.data.result.songs
				})
			})
		}
	}
	del(i) {
		let arr = JSON.parse(localStorage.getItem("history"))
		arr.splice(i, 1)
		localStorage.setItem("history", JSON.stringify(arr))
		this.setState({
			arr: arr
		})
	}
	// typescript   javascript
	delAll() {
		let arr = JSON.parse(localStorage.getItem("history"))
		arr = []
		localStorage.setItem("history", JSON.stringify(arr))
		this.setState({
			arr: arr
		})
	}
	render() {
		let { flag, searchVal, searchList, hots } = this.state
		let arr = JSON.parse(localStorage.getItem("history"))
		return (
			<div className="search">
				<div className="search-box">
					<input type="text" value={searchVal} onKeyDown={this.keydown.bind(this)} onChange={this.searchChange.bind(this)} />
					<i className="iconfont icon-fangdajing"></i>
					{flag && <i onClick={this.cancel.bind(this)} className="iconfont icon-zanting_huaban"></i>}
				</div>
				{
					flag ? <MusicList list={searchList} /> : (
						<div className="box">
							<div className="hot-search">
								<p>热门搜索</p>
								<ul>
									{
										hots.map((item, index) => {
											return <li onClick={this.clickTag.bind(this, item.first)} key={index}>{item.first}</li>
										})
									}
								</ul>
							</div>
							<div className="search-history">
								<button onClick={this.delAll.bind(this)}>清空搜索记录</button>
								<ul>
									{
										arr.map((item, index) => {
											return <li key={index}>
											<i className="iconfont icon-fangdajing"></i>
											<span>{item}</span>
											<i onClick={this.del.bind(this, index)} className="iconfont icon-zanting_huaban"></i>
										</li>
										})
									}
								</ul>
							</div>
						</div>
					)
				}


			</div>
		);
	}
}

export default Search;
