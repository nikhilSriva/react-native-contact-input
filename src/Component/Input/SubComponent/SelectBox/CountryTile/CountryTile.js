import React,{memo} from 'react'
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";

export function CountryTile(props)  {
        return (
            <TouchableWithoutFeedback key={props.key} onPress={() =>props.handleMultiFunctions(props.item)}>
                <View key={props.key} style={{
                    flexDirection: 'row',
                    marginBottom: 4,
                    paddingHorizontal: 7,
                    paddingVertical: 2
                }}>
                   <Image
                       source={{uri:props.item.flag}}
                           style={{width: 20, height: 20}}/>
                    <Text style={{fontFamily: 'Nunito', paddingHorizontal: 10}}>{props.item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
}

export default memo(CountryTile);