import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Button,
    DeviceEventEmitter,
    Alert,
} from 'react-native';
import md5 from 'md5';
import Header from '../components/Header';
import loginStyle from '../styles/loginStyle';
import CommonConst from '../constant/CommonConst';
import { login } from '../service';
import storage from '../utils/Storage';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);

        CommonConst.navigation = this.props.navigation;
        this.state = {
            password: '',
            username: '',
        };
    }

    componentDidMount() {
        const self  = this;
        storage.load({
            key: "token",
            autoSync: false
        }).then(token => {
            if (token.access_token) {
                CommonConst.access_token = token.access_token;
                CommonConst.refresh_token = token.refresh_token;
                CommonConst.expiresIn = token.expiresIn;
                self.props.navigation.navigate('MyTab');
            }
        }).catch(err => {
            return err;
        });
    }
    loginChange = () => {
        const { password, username } = this.state;
        const body ={
            username,
            password: md5(password).toUpperCase(),
            "type": "account", // default
            "pwdType": "pwd", // default
            "autoLogin": true, // default
            "password_type": 2, // default
            "language": 2 // default
        }
        login(body).then(data => {
            if(data.access_token){
                this.props.navigation.navigate('MyTab')
            } else {
                Alert.alert(
                    'Error',
                    '账号或密码错误！',
                )
            }
        })
    }

    render() {
        return (
            <View style={loginStyle.all}>
                <Header title='登录' />
                <View style={loginStyle.logoItem}>
                    <Image source={require('../images/logo.png')} style={loginStyle.logoImage}/>
                    <Text style={loginStyle.logoText}>掌上热网</Text>
                </View>
                <View style={loginStyle.loginItem}>
                    <View style={loginStyle.loginItemEmail}>
                        <View style={loginStyle.loginItemLogo}>
                            <Image source={require('../images/username.png')}
                                   style={loginStyle.loginItemLogo_Img}/>
                        </View>
                        <View>
                            <TextInput style={loginStyle.TextInput}
                                       value={this.state.username}
                                       autoCapitalize='none'
                                       onChangeText={(username) => this.setState({username:username.toLowerCase(),message:''})}
                                       placeholder='邮箱'
                                       underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>
                    <View style={loginStyle.loginItemPassword}>
                        <View style={loginStyle.loginItemLogo}>
                            <Image source={require('../images/password.png')}
                                   style={loginStyle.loginItemLogo_Img}/>
                        </View>
                        <View>
                            <TextInput style={loginStyle.TextInput}
                                       value={this.state.password}
                                       secureTextEntry={true}
                                       onChangeText={(password) => this.setState({password:password,message:''})}
                                       placeholder='密码'
                                       underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={loginStyle.button} onPress={this.loginChange}>
                        <Text style={loginStyle.ButtonText}>登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}