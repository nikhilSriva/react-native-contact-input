import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import CustomInput from "./Component/Input/Input";

class App extends Component {

  /*handleCustomInputStates = (value, isEmail) => {
    this.setState({isEmail})
    if (isEmail)
      this.setState({email: value}, () => console.log(this.state.email))
    else
      this.setState({phone: `+${value}`}, () => console.log(this.state.phone))
  };*/

  render() {
    return (
      <View>
        <CustomInput
            onChange={(value,state)=>console.log(value+' >> '+state)}
            disableEmail={true}
            style={{flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              color:'green',
              fontSize:18,
              marginLeft:10,
              fontWeight:600,
              fontFamily:'Nunito',
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
