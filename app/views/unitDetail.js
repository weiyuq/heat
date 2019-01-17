import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Button, Alert
} from 'react-native';
import moment from "moment";
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import Header from '../components/Header';
import metrics from "../constant/metrics";
import styles from "../styles/unitDetailStyle";
import rightImage from "../images/right.png";
import { getTimeUnit } from '../service';

const originMetrics = {
    metrics: cloneDeep(metrics.metrics),
};
export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard: [],
            alarmState: [],
            machineParamState: [],
            machineState: [],
            timestamp: '',
        };
    }

    componentWillMount() {
        this.getTimeUnit();
    }
    getTimeUnit = () => {
        const { params } = this.props.navigation.state;
        getTimeUnit(params.id).then(data => {
            const { result = {}, err } = data;
            if (data.result) {
                // format data from api as metrics.js;
                const  { metrics = {}, timestamp = '' } = result;
                let allMetrics = {};
                const arrMetrics  = {};
                Object.keys(metrics).forEach( key => {
                    const keyType = isObject(metrics[key]);
                    if (keyType) {
                        const childMetrics = metrics[key];
                        const childObject = {};
                        Object.keys(childMetrics).forEach( child => {
                            childObject[child] = {
                                value: childMetrics[child],
                            };
                        });
                        arrMetrics[key] = {
                            fields: childObject,
                        };
                        allMetrics = {
                            ...allMetrics,
                            ...childMetrics,
                            update: true,
                        };
                    } else {
                        allMetrics = {
                            ...allMetrics,
                            [key]: metrics[key],
                            update: true,
                        };
                    }
                });
                const apiData = {
                    ...allMetrics,
                    timestamp,
                    update: true,
                    metrics: arrMetrics,
                };

                // merge api's data with metrics.js
                const filterMetrics = merge(apiData.metrics, originMetrics.metrics);
                const metricsData = this.formatMetrics(filterMetrics);
                const groupedMetrics = this.groupingMetrics(metricsData);
                this.setState({ ...groupedMetrics, timestamp });
            } else {
                const groupedMetrics = {
                    dashboard: [],
                    alarmState: [],
                    machineParamState: [],
                    machineState: [],
                };
                this.setState({ ...groupedMetrics });
            }
        })
    }

    formatMetrics = metrics => {
        const metricsData = [];
        if (isObject(metrics)) {
            Object.keys(metrics).forEach(key => {
                if (key !== 'metrics') {
                    const { fields } = metrics[key];
                    Object.keys(fields).forEach(field => {
                        metricsData.push({ ...fields[field] });
                    });
                }
            });
        }
        return metricsData;
    };

    groupingMetrics = metricsData => {
        const dashboard = [];
        const alarmState = [];
        const machineParamState = [];
        const machineState = [];
        Object.keys(metricsData).forEach(item => {
            const { group } = metricsData[item];
            if (group === 'dashboard') {
                dashboard.push({ ...metricsData[item] });
            }
            if (group === 'alarmState') {
                alarmState.push({ ...metricsData[item] });
            }
            if (group === 'machineParamState') {
                machineParamState.push({ ...metricsData[item] });
            }
            if (group === 'machineState') {
                machineState.push({ ...metricsData[item] });
            }
        });
        return {
            dashboard,
            alarmState,
            machineParamState,
            machineState,
        };
    };


    back = () => {
        this.props.navigation.goBack();
    }
    render() {
        const { dashboard, alarmState, machineParamState, machineState, timestamp } = this.state;
        return (
            <View style={{flex: 1}}>
                <Header title='告警' back={this.back} />
                <View style={styles.unitItem}>
                    <Text>更新时间： {timestamp && moment(timestamp).format('YYYY/MM/DD hh:mm:ss')}</Text>
                </View>
                <View>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate("UnitValue", {title: '仪表数据', data: dashboard})}
                        style={{margin: 10}}
                    >
                        <View style={styles.unitItem}>
                            <Text>仪表数据</Text>
                            <Image style={styles.rightImage} source={rightImage}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate("UnitValue", {title: '告警状态', data: alarmState})}
                        style={{margin: 10}}
                    >
                        <View style={styles.unitItem}>
                            <Text>告警状态</Text>
                            <Image style={styles.rightImage} source={rightImage}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate("UnitValue", {title: '机组参数设定', data: machineParamState})}
                        style={{margin: 10}}
                    >
                        <View style={styles.unitItem}>
                            <Text>机组参数设定</Text>
                            <Image style={styles.rightImage} source={rightImage}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate("UnitValue", {title: '机组状态设定', data: machineState})}
                        style={{margin: 10}}
                    >
                        <View style={styles.unitItem}>
                            <Text>机组状态设定</Text>
                            <Image style={styles.rightImage} source={rightImage}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}