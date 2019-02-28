import React, {PureComponent,memo} from 'react'
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";

export class CountryTile extends PureComponent{
    constructor(props){
        super(props);
        this.state={

        }
    }


    render(){
        return(
            <TouchableWithoutFeedback key={this.props.key} onPress={() => this.props.handleMultiFunctions(this.props.item)}>
                <View key={this.props.key} style={{
                    flexDirection: 'row',
                    marginBottom: 4,
                    paddingHorizontal: 5,
                    paddingVertical: 2
                }}>
                    <Image source={{uri: this.props.item.url + this.props.item.code.toLowerCase() + '.svg'}}
                           style={{width: 25, height: 25}}/>
                    <Text style={{fontFamily:'Nunito',paddingHorizontal:10}}>{this.props.item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}
export default memo(CountryTile)