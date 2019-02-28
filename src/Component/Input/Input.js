import React from 'react';
import {Text, View, TextInput, StyleSheet, Image} from 'react-native'
import FlagSelect from './SubComponent/SelectBox/Select'
import PropTypes from 'prop-types';

const alphabetRegex = new RegExp('[a-zA-Z]+')
const numberRegex = new RegExp('[0-9]+$');
const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export class CustomInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            email: '',
            wrongFormatPhoneNumber: false,
            dialCode: 91,
            countryCode: 'IN',
            // isEmail: props.disableEmail===undefined&&props.disablePhoneNumber===undefined?false:props.disableEmail ? false : null,
            isEmail: props.disableEmail ? false : true,
            color: '#DCDCDC',
            borderBottomWidth: 1,
            // isNumber: props.disableEmail===undefined&&props.disablePhoneNumber===undefined?false:props.disablePhoneNumber ? false : null,
            isNumber: props.disablePhoneNumber ? false : true,
            labelTitle: props.labelTitle,
            errorState: false,
            count: 1,
            isFirstInputNumCheck: 1
        };
        if (props.disableEmail === true) {
            this.setState({isEmail:false,isNumber: true, labelTitle: this.props.labelTitle})
        }
        if (props.disablePhoneNumber === true) {
            this.setState({isEmail: true,isNumber:false, labelTitle:this.props.labelTitle})
        }
    }

    validationEmail = (value) => {
        this.setState({email: value}, () => {
            this.setState({
                errorState: false,
            });
            if (this.state.email !== '')
                this.setState({errorState: false})
            if (emailRegex.test(this.state.email) !== true)
                this.setState({errorState: true});
            else
                this.setState({errorState: false});
            if (this.state.email === "")
                this.setState({
                    errorState: false,
                })
            this._onChange(this.state.value, this.state.isEmail)
        })
    };

    handlePhoneNumberValidation = (number) => {
        if (number !== '') {
            console.log(typeof this.state.countryCode)
            const phoneNumber = phoneUtil.parseAndKeepRawInput(number, this.state.countryCode);
            if (phoneUtil.isValidNumber(phoneNumber))
                this.setState({wrongFormatPhoneNumber: false});
            else
                this.setState({wrongFormatPhoneNumber: true});
        }
        this._onChange(`+${this.state.value}`, this.state.isEmail)

    };

    _onChange = (value, isEmail) => {
        this.props.onChange(value, isEmail)
    };

    inputValidation = (e) => {
        if (alphabetRegex.test(e.target.value) === true)
        {
            if (this.props.disableEmail === true)
                this.setState({wrongFormatPhoneNumber: true, isNumber: true});
            else {
                if (this.state.isFirstInputNumCheck === 1 && this.state.count !== 1) {
                    this.setState({value: e.target.value.substring(this.state.dialCode.toString().length, e.target.value.length)});
                    let c = this.state.isFirstInputNumCheck;
                    ++c;
                    this.setState({isFirstInputNumCheck: c})
                } else
                    this.setState({value: e.target.value});
                this.setState({isEmail: true, isNumber: false, labelTitle: this.props.labelTitle,});
                this.validationEmail(this.state.value);
            }
        } else if (e.target.value === '')
            this.setState({
                labelTitle: this.props.disablePhoneNumber===undefined&&this.props.disableEmail===undefined?'Email or Phone Number':this.props.disableEmail === true ? this.props.labelTitle : this.props.labelTitle,
                value: e.target.value,
                isEmail: this.props.disablePhoneNumber ? true : null,
                isNumber: this.props.disableEmail ? true : null,
                count: 1,
                isFirstInputNumCheck: 1,
                dialCode: 91
            });
        else if (numberRegex.test(e.target.value[0]) === true)
        {
            if (this.props.disablePhoneNumber === true)
            {
                console.log('sqqqq')
                this.setState({errorState: true, isEmail: true,value:e.target.value})
            }
            else
                {
                this.setState({dialCode: this.state.dialCode});
                if (this.state.count === 1) {
                    this.setState({
                        value: this.state.dialCode + e.target.value,
                        isEmail: false,
                        isNumber: true,
                        labelTitle: this.props.labelTitle,
                        errorState: false
                    });
                    let c = this.state.count;
                    ++c;
                    this.setState({count: c})
                } else {
                    this.setState({
                        isEmail: false,
                        isNumber: true,
                        labelTitle: this.props.labelTitle,
                        value: e.target.value,
                        errorState: false
                    })
                }
            }
        }
    };

    handleKeyPress = (e) => {
        if (e.keyCode === 8) {
            this.setState({wrongFormatPhoneNumber: false})
        }
        if (e.keyCode === 8 && e.target.value.length === 1)
            this.setState({errorState: false})
    };

    setDialCode = (dialCode, countryCode) => {
        this.setState({dialCode});
        this.setState({countryCode}, () => console.log(this.state.countryCode));
        let phoneValue = this.state.value.substring(this.state.dialCode.toString().length, this.state.value.length);
        this.setState({
            value: dialCode + phoneValue,
        }, () => this.handlePhoneNumberValidation(this.state.value))

    };

    render() {
        const {style}=this.props
        const errorStyles=StyleSheet.flatten([this.props.style,styles.errorLabelStyle])
        const errorStyle={...errorStyles}

        return (
            <View style={style}>
                <View>
                    <View style={{marginVertical: 2}}>
                        {this.state.isEmail ?
                                <Text style={style}>
                                    {this.state.labelTitle}
                                </Text> :
                            <Text style={style}>
                                {this.state.labelTitle}
                            </Text>
                        }
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            flex: -1, borderColor: this.state.color,
                            borderBottomWidth: this.state.borderBottomWidth, height: 30
                        }}>
                            {this.state.isEmail ?
                                null
                                :
                                this.state.isNumber ?
                                    <FlagSelect
                                        handleCode={this.setDialCode}
                                        color={this.state.color}
                                    />
                                    :
                                    null
                            }
                        </View>
                        <View style={{
                            zIndex: -999,
                            flex: 1,
                            borderColor: this.state.color,
                            height: 30
                        }}>
                            <TextInput
                                type={this.state.isEmail ? 'text' : 'number'}
                                autoCorrect={false}
                                style={this.state.isEmail ?
                                    [styles.inputStyles, {
                                    flex: 1, height: 30,
                                    width:244,
                                    borderColor: this.state.color,
                                    borderBottomWidth: this.state.borderBottomWidth
                                }] :
                                    this.state.isNumber?
                                        [styles.inputStyles, {
                                            flex:1,
                                            width:196,
                                            borderColor: this.state.color, height: 30,
                                            borderBottomWidth: this.state.borderBottomWidth}]
                                        :
                                    [styles.inputStyles, {
                                    flex:1,
                                    width:244,
                                    borderColor: this.state.color, height: 30,
                                    borderBottomWidth: this.state.borderBottomWidth
                                }]}
                                value={this.state.value}
                                onFocus={() => this.setState({color: '#0098EF', borderBottomWidth: 2})}
                                onBlur={this.state.isEmail === false && this.state.isNumber === false ? () => {
                                        this.setState({
                                            color: '#DCDCDC',
                                            borderBottomWidth: 1
                                        })
                                    } :
                                    this.state.isEmail ?
                                        () => {

                                            this.setState({
                                                color: '#DCDCDC',
                                                borderBottomWidth: 1
                                            }, this.validationEmail(this.state.value))
                                        } : () => {
                                            this.setState({
                                                color: '#DCDCDC',
                                                borderBottomWidth: 1
                                            }, this.handlePhoneNumberValidation(this.state.value))
                                        }}
                                placeholder={this.props.disableEmail===undefined&&this.props.disablePhoneNumber===undefined?'Email or Phone Number':this.props.disableEmail ? "Phone Number" : "Email"}
                                onChange={(e) => this.inputValidation(e)}
                                onKeyPress={this.handleKeyPress}
                            />
                        </View>
                    </View>
                    <View style={{zIndex: -99}}>
                        {this.state.errorState ?
                                <Text style={errorStyle}>Invalid Email</Text> : null
                        }
                        {
                            this.state.wrongFormatPhoneNumber ?
                                <Text style={errorStyle}>Invalid Phone Number Format</Text> : null
                        }

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputStyles: {
        fontSize: 18,
        outline: 'none',
    },
    errorLabelStyle: {
        fontSize:15,
        color: 'red',
        paddingTop: 2,
        // justifyContent: 'flex-start'

    }
});


CustomInput.propTypes = {
    disableEmail: PropTypes.bool,
    disablePhoneNumber: PropTypes.bool,
    onChange: PropTypes.func,
    style: PropTypes.object.isRequired,
    labelTitle: PropTypes.string
};
CustomInput.defaultProps={
    disableEmail:false,
    disablePhoneNumber:false,
    labelTitle:''
}

export default CustomInput;