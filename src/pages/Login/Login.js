import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
class Login extends Component {
    login() {
        let phone = this.refs.phone.value
        let password = this.refs.password.value
        this.$http.get(`/login/cellphone?phone=${phone}&password=${password}`).then(res => {
            console.log(res)
            if (res.data.code == 200) {
                sessionStorage.setItem("id", 123)
                this.props.history.push("/home")
            }
        })
    }
    render() {
        return (
            <div>
                <h1>登录页面</h1>
                <NavLink to="/register">注册</NavLink>
                <input type="text" ref="phone"/>
                <br/>
                <input type="text" ref="password"/>
                <br/>
                <button onClick={this.login.bind(this)}>登录</button>
            </div>
        );
    }
}

export default Login;
