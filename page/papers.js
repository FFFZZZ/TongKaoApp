import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  BackHandler,
  FlatList,
  Image,
  StatusBar,
  RefreshControl
} from 'react-native';
import Util from '../helper/Util';
import Item from './item';
import Api from '../helper/Api';
import Nodata from './nodata'

export default class Papers extends Component {
  constructor() {
    super(),
      this.state = {
        refreshing: false,
        data: [],
        tongji: []
      }
  }
  componentDidMount() {
    this._refresh();
  }
  _refresh() {
    var _this = this
    this.setState({ refreshing: true })
    fetch(Api.GetPaperList + Api.SchoolId + "&StuId=" + global.user.userData.Id)
      .then(respond => respond.json())
      .then(res => {
        if (res.code == 1) {
          _this.setState({ data: res.data, tongji: res.tongji })
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
  _paper = (index) => {
    var paper = this.state.data[index]
    this.props.screenProps.paper(paper)
  }
  render() {
    return (
      <View style={[{ flex: 1, backgroundColor: '#fff' }]}>
        <View style={styles.container}>
          <FlatList
            style={[{ width: Util.size.width, alignContent: 'center' }]}
            data={this.state.data}
            keyExtractor={(item) => item.Id}
            ListHeaderComponent={() => <View></View>}
            ItemSeparatorComponent={() => <View style={[{ height: Util.pixel, backgroundColor: '#C0C9D3' }]}></View>}
            ListEmptyComponent={() => <Nodata />}
            renderItem={({ item, index }) => <Item Action={this._paper} Index={index} Paper={item} Tongji={this.state.tongji[index]} />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._refresh()}
                colors={[Util.color.Main]}
                tintColor={Util.color.Main}
              />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Util.size.width - 15,
    overflow: 'hidden',
  }
});