import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableHighlight,
    ToastAndroid,
    StatusBar
} from 'react-native';


import Util from '../helper/Util'

import Api from '../helper/Api'


export default class login extends Component {
    constructor() {
        super();
        this.state = {
            Name: '',
            StuNo: '',
            PassWord: ''
        }
    }
    static navigationOptions = {
        headerMode: 'none',
        header: null
    };
    _login() {
        if (this.state.Name == '') {
            ToastAndroid.show('姓名不能为空', 2);
            return false;
        }
        if (this.state.StuNo == '') {
            ToastAndroid.show('账号不能为空', 2);
            return false;
        }
        if (this.state.PassWord == '') {
            ToastAndroid.show('密码不能为空', 2);
            return false;
        }
        var data = { SchoolId: Api.SchoolId, Name: this.state.Name, StuNo: this.state.StuNo, PassWord: this.state.PassWord }
        fetch(Api.Login,
            {
                method: 'POST',
                body: `SchoolId=${data.SchoolId}&Name=${data.Name}&StuNo=${data.StuNo}&PassWord=${data.PassWord}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            })
            .then(res => res.json())
            .then(backdata => {
                if (backdata.code == 1) {
                    data.Id = backdata.data.Id;
                    storage.save({ key: 'user', data: data, expires: null })
                    global.user = { loginState: true, userData: data }
                    this.props.navigation.navigate('MainScreen');
                } else {
                    ToastAndroid.show(backdata.msg, 2)
                }
            })
            .catch((err) => { ToastAndroid.show(err.message, 2) })
    }
    render() {
        const top = 0 - Util.size.width * 0.1;
        return (

            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                    translucent={false}
                />
                <Image
                    source={require('./image/top.png')}
                    style={[{ width: Util.size.width, height: Util.size.width * 0.7, top: top }]}
                />
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'账号'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => { this.setState({ StuNo: text }) }}
                        value={this.state.StuNo}
                    />
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid='transparent'
                        placeholder={'姓名'}
                        onChangeText={(text) => { this.setState({ Name: text }) }}
                        value={this.state.Name}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={'密码'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ PassWord: text }) }}
                        value={this.state.PassWord}
                    />
                </View>
                <TouchableHighlight
                    style={styles.login}
                    onPress={() => this._login()}
                    underlayColor="#fff">
                    <ImageBackground style={[{ width: Util.size.width * 0.5, height: Util.size.width * 0.11 }]} source={require('./image/button.png')} >
                        <Text style={styles.loginText}>登陆</Text>
                    </ImageBackground>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    textInput: {
        width: Util.size.width * 0.7,
        borderBottomColor: '#C0C9D3',
        borderBottomWidth: Util.pixel,
        padding: Util.pixel * 30,
        fontSize: 20,
        marginBottom: 20
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        lineHeight: Util.size.width * 0.11
    }
});