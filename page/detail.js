import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import Util from '../helper/Util';
import { dateFtt } from '../helper/common'

import Icon from 'react-native-vector-icons/FontAwesome'

import Api from '../helper/Api'
import SItem from './sitem'
import Nodata from './nodata'

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params.Name,
            headerTitleStyle: {
                color: '#fff',
                alignSelf: 'center',
            },
            headerStyle: {
                backgroundColor: Util.color.Main,
            },
            headerRight: <View></View>,
            headerLeft: <View style={[{ marginLeft: 10 }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('MainScreen')
                    }}
                    style={[{ width: 40 }]}
                >
                    <Icon name="angle-left" size={40} color="#fff" />
                </TouchableOpacity  >
            </View>
        }
    }
    componentDidMount() {
        this._refresh()
    }
    _refresh() {
        var _this = this
        const { params } = _this.props.navigation.state
        this.setState({ refreshing: true })
        const url = `?StuId=${global.user.userData.Id}&PaperId=${params.Id}`
        fetch(Api.GetStuWorkList + url)
            .then(respond => respond.json())
            .then(res => {
                if (res.code == 1) {
                    _this.setState({ data: res.data })
                }
                else {
                    ToastAndroid.show(res.msg, 2000);
                }
                this.setState({ refreshing: false })
            })
            .catch(err => {
                ToastAndroid.show(err.message, 2000);
                this.setState({ refreshing: false })
            })
    }
    _doWork = () => {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate('DoWorkScreen', params)
    }
    _history = (index) => {
        const params = this.state.data[index];
        this.props.navigation.navigate('HistoryScreen', params)
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <View style={[{ width: Util.size.width * 0.7 }]}>
                        <Text >答题可用时间:{params.ReplyTime == -1 ? '无限制' : params.ReplyTime + '分钟'}</Text>
                    </View>
                    <TouchableOpacity style={styles.work} onPress={this._doWork}>
                        <Text>去答题</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.lable}>答题记录:</Text>
                <View style={[{ flex: 1, backgroundColor: '#fff' }]}>
                    <View style={styles.list}>
                        <FlatList
                            style={[{ width: Util.size.width, alignContent: 'center' }]}
                            data={this.state.data}
                            keyExtractor={(item) => item.Id}
                            ItemSeparatorComponent={() => <View style={[{ height: Util.pixel, backgroundColor: '#C0C9D3' }]}></View>}
                            ListEmptyComponent={() => <Nodata />}
                            renderItem={({ item, index }) => <SItem Index={index} Paper={item} Action={this._history} />}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._refresh()}
                                    colors={[Util.color.Main]}
                                    tintColor={Util.color.Main}
                                />
                            }
                            ListFooterComponent={<View style={[{ height: 30 }]}></View>}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    info: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    work: {
        padding: 5,
        borderRadius: 5,
        borderWidth: Util.pixel,
        borderColor: Util.color.Main
    },
    lable: {
        lineHeight: 40,
        paddingLeft: 10
    },
    list: {
        backgroundColor: '#fff',
        flex: 1,
        width: Util.size.width - 15,
        overflow: 'hidden',
    }
})