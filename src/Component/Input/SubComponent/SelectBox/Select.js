import React from 'react';
import {Text, TextInput, View, Image, TouchableWithoutFeedback, VirtualizedList,TouchableHighlight} from 'react-native';
import countryData from './Data/CountriesData'
import * as _ from 'lodash';

export class FlagSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            dropdownVisible: false,
            flagIcon: 'http://flags.ox3.in/svg/in.svg',
            dialCode: 91,
            modalVisible: false,
            fullData: countryData,
            data: countryData,
            query: '',
        };
    }

    showDropdown = () => {
        this.setState({dropdownVisible: !this.state.dropdownVisible})
    };

    containsName = ({name}, query) => {
        if(name.toLowerCase().includes(query))
            return true;
        else
            return false;
    };


    handleSearch = (text) => {
        const data = _.filter(this.state.fullData, user => {
            return this.containsName(user, text);
        });
        this.setState({query: text, value: text, data})

    }
    handleMultiFunctions = (item) => {
        this.setState({
            flagIcon: item.url + item.code.toLowerCase() + '.svg',
            dropdownVisible: false
        });
        this.props.handleCode(item.dialCode,item.code)
    }

    render() {
        return (
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight onPress={() => this.showDropdown()} style={{width:48,height:20,flexDirection:'row',}}>
                        <Image source={{uri: this.state.flagIcon}}
                               style={{width: 30, height: 20, borderRadius: 6}}/>
                    </TouchableHighlight>
                </View>
                {this.state.dropdownVisible ?
                    <View style={{
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 7,
                        width: 220,
                        top:50,
                        left:5,
                        // marginTop: 24,//for chrome
                        // marginTop: 5,//for IE
                        marginBottom: 5,
                        height: 200,
                        paddingBottom:10,
                        backgroundColor:'white',
                        position:'absolute',
                        zIndex:10,
                    }}>
                        <TextInput
                            value={this.state.value}
                            placeholder="Search Here..."
                            style={{
                                borderWidth: 0.5,
                                padding: 5,
                                marginHorizontal: 5,
                                borderColor: '#ccc',
                                borderRadius: 6,
                                marginBottom: 3,
                                marginTop: 3
                            }}
                            autoFocus
                            onBlur={()=>this.setState({dropdownVisible:false})}
                            onChangeText={value => this.handleSearch(value)}
                        />
                        <VirtualizedList
                            data={this.state.data}
                            getItemCount={data => data.length}
                            getItem={(data, index) => data[index]}
                            renderItem={({item, key}) => (
                                <TouchableWithoutFeedback key={key} onPress={() => this.handleMultiFunctions(item)}>
                                    <View key={key} style={{
                                        flexDirection: 'row',
                                        marginBottom: 4,
                                        paddingHorizontal: 5,
                                        paddingVertical: 2
                                    }}>
                                        <Image source={{uri: item.url + item.code.toLowerCase() + '.svg'}}
                                               style={{width: 25, height: 25}}/>
                                        <Text>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                            }
                        />
                    </View> : null}
            </View>

        )
    }
}

export default FlagSelect;
