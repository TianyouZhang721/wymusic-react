import React, { Component } from 'react';

class Register extends Component {
    getCode() {
        let phone = this.refs.phone.value
        this.$http.get("/captcha/sent?phone=" + phone).then(res => {
            console.log(res)
        })
    }
    register() {
        let phone = this.refs.phone.value
        let password = this.refs.pwd.value
        let captcha = this.refs.captcha.value
        let nickname = this.refs.nickname.value
        this.$http.get("/register/cellphone", {
            params: {
                phone,
                password,
                captcha,
                nickname
            }
        }).then(res => {
            console.log(res)
            if (res.status == 200) {
                this.props.history.push("/login")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                手机号：<input type="text" ref="phone"/>
                <br/>
                密码：<input type="text" ref="pwd"/>
                <br/>
                验证码：<input type="text" ref="captcha" />  <button onClick={this.getCode.bind(this)}>获取验证码</button>
                <br/>
                昵称：<input type="text" ref="nickname"  />
                <br/>
                <button onClick={this.register.bind(this)}>注册</button>
            </div>
        );
    }
}

export default Register;
