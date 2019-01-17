import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LoginView from './app/views/login';
import UnitList from './app/views/unitList';
import Router from './app/Router';
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Router/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
