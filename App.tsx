import { Text, View } from 'react-native'
import React, { Component } from 'react'
import HomeScreen from './src/HomeScreen'


export class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <HomeScreen/>
      </View>
    )
  }
}

export default App