import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,

} from 'react-native';
import Util from '../helper/Util';
import { dateFtt } from '../helper/common'
export default class Item extends Component {
    render() {
        var paper = this.props.Paper;
        var tongji = this.props.Tongji;
        return (
            <TouchableHighlight
                style={styles.container}
                onPress={() => this.props.Action(this.props.Index)}
                underlayColor="#fff"  >
                <View style={styles.card}>
                    <Text style={styles.title}>{paper.Name}</Text>
                    <View style={[{ flexDirection: 'row' }]} >
                        <Text style={styles.date}>答题时间:{dateFtt("yyyy-MM-dd", paper.StartTime)}</Text>
                        <Text style={styles.date}>~{dateFtt("yyyy-MM-dd", paper.EndTime)}</Text>
                    </View>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <Text style={styles.date}>总分:{paper.TotalScore}</Text>
                        <Text style={[styles.date, tongji.Count == 0 ? styles.Warning : styles.Success]}>已做{tongji.Count}次</Text>
                        <Text style={[styles.date, tongji.Score == 0 ? styles.Warning : styles.Success]}>最高分:{tongji.Score}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Util.size.width
    },
    title: {
        color: Util.font.main,
        fontSize: 16,
    },
    date: {
        color: Util.font.placeholder,
        fontSize: 14,
        marginTop: 5
    },
    Success: {
        color: Util.color.Success
    },
    Warning: {
        color: Util.color.Danger
    },
    card: {
        padding: 15
    }

})