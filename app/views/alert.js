import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Button
} from 'react-native';

import Header from '../components/Header';
import loginStyle from '../styles/loginStyle';

export default class AlertView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }
    render() {
        return (
            <View style={loginStyle.all}>
                <Header title='告警' />
            </View>
        );
    }
}