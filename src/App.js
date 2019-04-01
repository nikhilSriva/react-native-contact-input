import React, { Component } from 'react';
import {
  View,
  Platform,
} from 'react-native';
import CustomInput from "./Component/Input";

class App extends Component
{
  render()
  {
    return (
      <View>
        <CustomInput
            onChange={(value,state)=>console.log(value+' >> '+state)}
            defaultCountry={'IN'}
            labelStyle={{color:'#3c3c3c',fontSize:18,fontFamily:'Nunito'}}
            inputFieldStyle={{color:'#3c3c3c',fontSize:15,fontFamily:'Nunito'}}
            style={{
              width:200,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',}}
        />
      </View>
    );
  }
}

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
