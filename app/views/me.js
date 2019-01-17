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

import Header from '../components/Header';
import loginStyle from '../styles/loginStyle';
import { logout } from '../service';

export default class MeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }
    logout = () => {
        logout();
    }
    render() {
        return (
            <View style={loginStyle.all}>
                <Header title='我' />
                <View>
                    <TouchableOpacity style={loginStyle.button} onPress={this.logout}>
                        <Text style={loginStyle.ButtonText}>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}