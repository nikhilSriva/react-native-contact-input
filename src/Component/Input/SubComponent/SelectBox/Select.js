import React from 'react';
import {Text, TextInput, View, Image, TouchableWithoutFeedback, VirtualizedList} from 'react-native';
import countryData from './Data/CountriesData'
import 'react-widgets/dist/css/react-widgets.css';
import _ from "lodash";
import TouchableHighlight from "react-native-web/dist/exports/TouchableHighlight";

export class FlagSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            dropdownVisible: false,
            flagIcon: 'http://flags.ox3.in/svg/in.svg',
            dialCode: 91,
            modalVisible: false,
            fullData: countryData,
            data: countryData,
            query: ''
        };
    }

    showDropdown = () => {
        this.setState({dropdownVisible: !this.state.dropdownVisible})
    }

    containsName = ({name}, query) => {
        if (name.toLowerCase().includes(query))
            return true
        else
            return false
    };


    handleSearch = (text) => {
        const data = _.filter(this.state.fullData, user => {
            return this.containsName(user, text);
        });
        this.setState({query: text, value: text, data})

    }
    handleSomething = (item) => {
        this.setState({
            flagIcon: item.url + item.code.toLowerCase() + '.svg',
            dropdownVisible: !this.state.dropdownVisible,
        });
        this.props.handleCode(item.dialCode)

    }

    render() {
        return (
            <View style={{}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight onPress={() => this.showDropdown()} style={{width:48,alignItems:'center',paddingBottom:2}}>
                        <Image source={{uri: this.state.flagIcon}}
                               style={{flex: 1, width: 30, height: 20, marginTop: 3, borderRadius: 6}}/>
                    </TouchableHighlight>
                </View>
                {this.state.dropdownVisible ?
                    <View style={{
                         borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 7,
                        width: 180,
                        marginRight:-136,
                        marginTop: 5,
                        marginBottom: 5,
                        height: 200,
                        paddingBottom:10,
                    }}>

                        <TextInput
                            value={this.state.value}
                            placeholder="Search Here..."
                            style={{
                                borderWidth: 0.5,
                                paddingLeft: 3,
                                marginHorizontal: 5,
                                borderColor: '#ccc',
                                borderRadius: 6,
                                marginBottom: 3,
                                marginTop: 3,
                            }}
                            autoFocus
                            onChangeText={value => this.handleSearch(value)}
                        />
                        <VirtualizedList
                            data={this.state.data}
                            getItemCount={data => data.length}
                            getItem={(data, index) => data[index]}
                            renderItem={({item, key}) => (
                                <TouchableWithoutFeedback key={key} onPress={() => this.handleSomething(item)}>
                                    <View key={key} style={{
                                        flexDirection: 'row',
                                        marginBottom: 4,
                                        paddingHorizontal: 5,
                                        paddingVertical: 2,
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

                {/*<View>
                    <Text> +{this.state.dialCode}</Text>
                </View>
*/}

            </View>

        )
    }
}

export default FlagSelect;
