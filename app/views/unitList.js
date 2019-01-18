import React, {Component} from 'react';
import {Alert, FlatList, Image, TouchableHighlight, View, Text} from 'react-native';
import { Tab, Tabs } from "native-base";
import styles from "../styles/unitListStyle";
import Header from '../components/Header';
import { getUnits } from '../service';
import onlineImage from '../images/1.png';
import offImage from '../images/2.png';
import CommonConst from '../constant/CommonConst';

export default class UnitList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: false,
            unitList: [],
        };
    }
    componentWillMount() {
        this.getUnitList();
    }
    onChangeTab = (data) => {
        const tab = data.i;
        if( tab === 0 ){
            this.getUnitList();
        } else if(tab === 1){
            this.getUnitList(1);
        } else {
            this.getUnitList(0);
        }

    }
    getUnitList = online => {
        const param = {
            "verbose": 10,
            "type": "exchanger", // 机型类型
            "recursive": true ,
            "cursor": 0, // 默认等于0
            "limit": 0, // 默认等于10
            // "online": 0 // 0表示离线 1表示在线 查全部传空值或者不传此字段
        };
        if(online !== undefined){
            param.online = online;
        }
        getUnits(param).then(data => {
            if(data){
                if(data.result){
                    this.setState({unitList: data.result })
                } else {
                    Alert.alert(
                        'Error',
                        '请求失败请重试！',
                    )
                }
            }
        })
    }
    render() {
        const { unitList } = this.state;
        return (
            <View style={{ flex:1 }}>
                <Header title='机组' />
                <Tabs
                    style={{backgroundColor: 'white'}}
                    onChangeTab={this.onChangeTab}
                >
                    <Tab heading="全部">
                        <ACListTab tab="all" data={unitList}/>
                    </Tab>
                    <Tab heading="在线">
                        <ACListTab tab="online" data={unitList}/>
                    </Tab>
                    <Tab heading="离线">
                        <ACListTab tab="offline" data={unitList}/>
                    </Tab>
                </Tabs>

            </View>
        );
    }
}

class ACListTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    _renderItem = ({item, separators}) => (
        <TouchableHighlight
            onPress={() => CommonConst.navigation.navigate("UnitDetail", {id: item._id, name: item.name })}
            style={{margin: 10}}
            >
            <View style={styles.unitItem}>
                <View style={{flex: 1, flexDirection: 'row',}}>
                    {item.online ? <Image style={styles.unitImage} source={onlineImage}/> :<Image style={styles.unitImage} source={offImage}/> }
                    <Text style={{marginLeft: 5}}>{item.name}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    _keyExtractor = (item, index) => item._id;

    render() {
        const { data } = this.props;
        return (
            <FlatList
                style={{backgroundColor: 'white'}}
                data={data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}