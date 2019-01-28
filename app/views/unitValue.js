import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Button,
    FlatList, Alert
} from 'react-native';

import Header from '../components/Header';
import styles from "../styles/unitDetailStyle";
import editImg from "../images/edit.png";
import okImg from "../images/queren.png";

function isFloat(value) {
    return ~~value !== value;
}
export default class UnitVale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
        };
    }

    componentWillMount() {

    }
    back = () => {
        this.props.navigation.goBack();
    }
    fixValue = data => {
        if(data === undefined){
            return '-';
        } else {
            if(isFloat(data)){
                return data.toFixed(2);
            } else {
                return data;
            }
        }
    }
    _keyExtractor = (item, index) => item.position;
    render() {
        const { title, data } = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1 }}>
                <Header title={title} back={this.back} />
                <FlatList
                    style={{backgroundColor: 'white'}}
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, separators})=> {
                        if(title === '告警状态' || title === '机组状态设定' ){
                            const { unit } = item;
                            let data = [];
                            if(item.value !== undefined){
                                data = unit.split('/');
                            }
                            return (
                                <View style={styles.valueItem}>
                                    <Text style={styles.valueText}>{item.desc}</Text>
                                    <Text style={styles.valueText}>{item.value !== undefined ? data[item.value].slice(0,data[item.value].length-1) : '-'}</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={styles.valueItem}>
                                    <Text style={styles.valueText}>{item.desc}</Text>
                                    <Text style={styles.valueText}>{this.fixValue(item.value)} {item.unit}</Text>
                                </View>
                            )
                        }
                    }}
                />
            </View>
        );
    }
}