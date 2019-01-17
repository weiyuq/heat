/**
 * Created by ZhouTing on 2016/12/3.
 *
 * 头部状态栏组件.参数详情如下:
 * context(必传参数):传入调用次组件的this对象.
 * title(可选):状态栏中间显示的标题.
 * leftImg(可选):状态栏左边按钮图片,参数可传入图片对象,或者'default'.传入'default',图片会显示返回按钮图片.
 * rightImg(可选):状态栏右边按钮图片,参数可传入图片对象.
 * leftFun(可选):状态栏左边按钮点击后所执行的function,不传此参数默认执行返回路由操作.
 * rightFun(可选):状态栏右边按钮点击后所执行的function.
 * isSearch(可选):状态栏中间是否有搜索框,默认没有.
 */
import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import commonStyle from '../styles/commonStyle'
import leftImg from '../images/back.png'

// const PIC_BACK = require('../../images/heads/back.png');
//
// import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        //if (this.props.title) {#0052cc
        //    let tracker = new GoogleAnalyticsTracker('UA-102681617-1');
        //    tracker.trackScreenView(this.props.title + '_Header');
        //}

        this.state = {
            context: this.props.context || this,
            title: this.props.title || '',
            isLeftIcon: !!this.props.leftImg,
            // isRightIcon: !!this.props.rightImg,
            // leftImg: this.props.leftImg === 'default' ? PIC_BACK : this.props.leftImg,
            // rightImg: this.props.rightImg || null,
            leftFun: this.props.leftFun || this.backRoute,
            // rightFun: this.props.rightFun || this.defaultRightButton,
            // isSearch: this.props.isSearch || false
        };
    }

    backRoute() {
        /**
         * 因为 "this.state.fun.bind(this.state.context)" 绑定是传过来的this,
         * 所以此方法中的this并不是当前组件的this,而是初始化本组件时传过来的this.
         */
        const {navigator, nav} = this.props;
        if (navigator) {
            this.props.navigator.pop();
        }
        if (nav) {
            this.props.nav.pop();
        }
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <View style={commonStyle.leftIcon}>
                    {this.props.back ?
                        <TouchableOpacity onPress={this.props.back} style={{width: 100}}>
                            {
                                //此处的width为100,只为了实现点击按钮的面积大一些的目的
                            }
                            <Image source={leftImg} style={commonStyle.leftIcon}/>
                        </TouchableOpacity> : null
                    }
                </View>
                <View style={commonStyle.titleBox}>
                    <Text style={commonStyle.title}>{this.state.title}</Text>
                </View>
            </View>
        )
    }
}

/*
 * refresh_error(error) {
 *    return (
 *        <View style={loginStyle.container}>
 *        <View style={loginStyle.loading}>
 *        <Text>'错误:'+error+''
 *        </Text>
 *        </View>
 *        </View>
 *    )
 * }
 */