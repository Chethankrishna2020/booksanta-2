import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from  './screens/WelcomeScreen';
import {AppTabNavigator} from './components/appTabNavigator';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
export default class App extends Component{
  render(){
    return(

     <AppContainer>
       
     </AppContainer>

    )

  }
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  BottomTab:{screen:AppTabNavigator},
})
const AppContainer = createAppContainer(
  switchNavigator
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
