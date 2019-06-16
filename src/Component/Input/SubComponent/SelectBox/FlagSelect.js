import React from 'react';
import {
    TextInput,
    Text,
    View,
    Image,
    Animated,
    VirtualizedList,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import countryData from './Data/CountriesData';
import * as _ from 'lodash';

import CountryTile from "./CountryTile/CountryTile";

const isIE = /*@cc_on!@*/false || !!document.documentMode;
export class FlagSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: 0,
            counter: 0,
            value: '',
            dropdownVisible: false,
            defaultCountry: props.defaultCountry ? props.defaultCountry : 'IN',
            flagIcon: props.defaultCountry ? `http://flags.ox3.in/svg/${props.defaultCountry.toLowerCase()}.svg` : 'http://flags.ox3.in/svg/in.svg',
            modalVisible: false,
            fullData: countryData,
            data: countryData,
            query: '',
        };
        if (!_.isEmpty(props.defaultCountry)) {
            countryData.map((item) => {
                if (props.defaultCountry.toLowerCase() === item.code.toLowerCase()) {
                    this.state = {
                        cursor: 0,
                        fullData: countryData,
                        data: countryData,
                        dialCode: item.dialCode,
                        flagIcon: `http://flags.ox3.in/svg/${props.defaultCountry.toLowerCase()}.svg`
                    }
                }
            })
        }


    }

    showDropdown = (e) => {
        this.setState({dropdownVisible: !this.state.dropdownVisible})
    };

    containsName = ({name}, query) => {
        if (name.toLowerCase().includes(query))
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
            dropdownVisible: false,
            dialCode: item.dialCode
        });
        this.props.handleCode(item.dialCode, item.code)
    }

    handleKeyDown(e) {
        const {cursor, data} = this.state
        if (e.keyCode === 38 && cursor > 0) {
            let counter = this.state.counter
            --counter;
            let c = this.state.cursor;
            --c;
            this.setState({cursor: c, counter}, () => this.handleScroll('up'))
        } else if (e.keyCode === 40 && cursor <= data.length - 1) {
            let counter = this.state.counter
            ++counter;
            let c = this.state.cursor;
            ++c;
            this.setState({cursor: c, counter}, () => this.handleScroll('down'))
        } else {
            if (e.key === 'Enter') {
                if (this.state.cursor !== 0) {
                    this.handleMultiFunctions(this.VTListRef.props.data[--this.state.cursor])

                }
            }
        }
    }

    handleScroll = (scrollType) => {
        if (scrollType === 'down') {
            if (this.state.counter % Math.floor(this.state.listContainerHeight / this.props.listItemStyle.height) === 0 && this.state.cursor > 0)
                this.VTListRef.scrollToIndex({index: this.state.cursor - 1})
        } else if (this.state.cursor > 0)
            this.VTListRef.scrollToIndex({index: this.state.cursor - 1})
    }


    renderVirtualizedList = (index, cursor) => {
        return (
            <VirtualizedList
                data={this.state.data}
                ref={(ref) => {
                    this.VTListRef = ref;
                }}
                getItemCount={data => data.length}
                keyboardShouldPersistTaps='handled' //might be neccesary to delete this
                getItem={(data, index) => data[index]}
                renderItem={({item, key}) => (
                    <View key={index++}
                          onLayout={(event) => {
                              let {height} = event.nativeEvent.layout
                              this.setState({listItemHeight: height})
                          }}
                          style={{backgroundColor: cursor === index ? 'rgba(1, 140, 207, 0.46)' : null}}>
                        <CountryTile
                            key={key}
                            item={item}
                            handleMultiFunctions={this.handleMultiFunctions}
                        />
                    </View>
                )
                }
            />
        )
    };

    render() {
        let index = 0;
        const {cursor} = this.state
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row',backgroundColor: 'transparent'}}>
                    <TouchableOpacity underlayColor='none' onPress={(e) => this.showDropdown(e)}
                                      style={{minWidth:isIE?88:0,flex:1, height: 20, flexDirection: 'row'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Image source={{uri: this.state.flagIcon}}
                                   style={{width: 30, height: 20, borderRadius: 6}}/>
                        </View>
                        <View style={{flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center'}}>
                            <Text style={[{
                                paddingLeft: 5
                            },this.props.inputFieldStyle]}>+{this.state.dialCode}</Text>
                            <Text style={{color: '#3c3c3c', fontSize: 21, fontFamily: 'Nunito'}}> | </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.dropdownVisible ?
                    <View>
                        <View
                            onLayout={(event) => {
                                let {height} = event.nativeEvent.layout
                                this.setState({listContainerHeight: height})
                            }}
                            style={{
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 7,
                                width: 220,
                                // top: 19,
                                left: -44,
                                marginTop: isIE?5:this.props.wrongFormatPhoneNumber?24:16,//for chrome
                                // marginTop: 5,//for IE
                                marginBottom: 5,
                                height: 230,
                                paddingBottom: 10,
                                backgroundColor: 'white',
                                position: 'absolute',
                                zIndex: 10,
                            }}>
                            <TextInput
                                value={this.state.value}
                                placeholder="Search Here..."
                                style={{
                                    borderWidth: 0.5,
                                    padding: 5,
                                    outline: 'none',
                                    marginHorizontal: 5,
                                    borderColor: '#ccc',
                                    borderRadius: 6,
                                    marginBottom: 3,
                                    marginTop: 3
                                }}
                                autoFocus
                                onBlur={() => this.setState({
                                    dropdownVisible: false,
                                    value: '',
                                    data: this.state.fullData
                                })}
                                onKeyPress={(e) => this.handleKeyDown(e)}
                                onChangeText={value => this.handleSearch(value)}
                            />
                            {this.renderVirtualizedList(index, cursor)}
                        </View></View> : null}
            </View>

        )
    }
}

export default FlagSelect;
