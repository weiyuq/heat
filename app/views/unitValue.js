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
                            const data = unit.split('/');
                            return (
                                <View style={styles.valueItem}>
                                    <Text style={styles.valueText}>{item.desc}</Text>
                                    <Text style={styles.valueText}>{item.value ? data[1].slice(0,data[1].length-1) : data[0].slice(0,data[0].length-1)}</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={styles.valueItem}>
                                    <Text style={styles.valueText}>{item.desc}</Text>
                                    <Text style={styles.valueText}>{item.value} {item.unit}</Text>
                                </View>
                            )
                        }
                    }}
                />
            </View>
        );
    }
}
class EditText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data.value.toString(),
            edit: false,
        };
    }
    render() {
        const { data } = this.props;
        return (
            <View  style={styles.editText}>
                {
                    this.state.edit ? (
                        <TextInput
                            style={styles.TextInput}
                            value={this.state.value}
                            autoCapitalize='none'
                            onChangeText={(value) => this.setState({value:value})}
                            underlineColorAndroid={'transparent'}
                        />
                    ) : (
                        <Text>{this.state.value}</Text>
                    )
                }
                <Text style={styles.valueText}>{data.unit}</Text>
                {
                    this.state.edit ? (
                        <TouchableOpacity onPress={() => this.setState({ edit:false})}>
                            <Image source={okImg} style={styles.editImg}/>
                        </TouchableOpacity>

                    ) : (
                        <TouchableOpacity onPress={() => this.setState({ edit:true})}>
                            <Image source={editImg} style={styles.editImg}/>
                        </TouchableOpacity>
                    )
                }

            </View>
        );
    }
}