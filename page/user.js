import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import Util from '../helper/Util';

export default class User extends Component {
    _loginOut() {
        storage.remove({ key: 'user' });
        global.user = { loginState: false, userData: "" };
        this.props.screenProps.loginOut();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cell}>
                    <Image style={styles.Image} source={require('./image/image.png')} />
                    <View>
                        <Text style={styles.name}>{global.user.userData.Name}</Text>
                        <Text>账号:{global.user.userData.StuNo}</Text>
                    </View>
                </View>
                <TouchableHighlight style={styles.login} underlayColor='#C0C4CC' onPress={() => this._loginOut()}>
                    <View>
                        <Text style={styles.loginText}>退出登陆</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    Image: {
        width: 60,
        height: 60,
        margin: 10
    },
    cell: {
        width: Util.size.width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        borderTopWidth: Util.pixel,
        borderTopColor: '#C0C9D3',
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#C0C9D3'

    },
    name: {
        color: Util.font.main,
        fontSize: 20,
        lineHeight: 30
    },
    login: {
        width: Util.size.width * 0.82,
        height: Util.size.height * 0.07,
        backgroundColor: Util.color.Main,
        borderRadius: Util.size.width * 0.05,
        marginTop: Util.size.height * 0.5,
        marginLeft: Util.size.width * 0.09
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: Util.size.height * 0.03,
        lineHeight: Util.size.height * 0.07
    }
});
