import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Animated,
    Platform,
    TouchableWithoutFeedback
} from 'react-native'
import FlagSelect from './SubComponent/SelectBox/FlagSelect'
import PropTypes from 'prop-types';
import _ from 'lodash';
import Lottie from 'react-lottie';
import * as crossAnimationData from '../Input/lottieFiles/cross'
import * as tickAnimationData from '../Input/lottieFiles/tick'

import LottieView from 'lottie-react-native';

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
            countryCode: props.defaultCountry || 'IN',
            isEmail: props.disableEmail ? false : true,
            dialCode: phoneUtil.getCountryCodeForRegion(props.defaultCountry),
            color: '#DCDCDC',
            borderBottomWidth: 1,
            isNumber: props.disablePhoneNumber ? false : true,
            labelTitle: props.disablePhoneNumber === false && props.disableEmail === false ? 'Enter Email or Phone Number' : props.disableEmail ? 'Enter the Phone Number' : 'Enter the Email',
            errorState: false,
            count: 1,
            isFirstInputNumCheck: 1
        };
        if (props.disableEmail === true) {
            this.setState({isEmail: false, isNumber: true, labelTitle: 'Enter the Phone number'})
        }
        if (props.disablePhoneNumber === true) {
            this.setState({isEmail: true, isNumber: false, labelTitle: 'Enter the Email'})
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
                });
            this._onChange(this.state.value, this.state.isEmail)
        })
    };

    handlePhoneNumberValidation = (number) => {
        if (number !== '' && number.toString().length !== 1) {
            const phoneNumber = phoneUtil.parseAndKeepRawInput(number, this.state.countryCode);
            if (phoneUtil.isValidNumber(phoneNumber)) {
                this.setState({wrongFormatPhoneNumber: false});
            } else
                this.setState({wrongFormatPhoneNumber: true});
        }

        const parsedObject = {
            dialCode: `+${this.state.dialCode}`,
            phoneNumber: this.state.value,
            parsedNumber: `+${this.state.dialCode}${this.state.value}`
        }
        // this._onChange(`+${this.state.dialCode}${this.state.value}`, this.state.isEmail)
        this._onChange(parsedObject, this.state.isEmail)

    };

    _onChange = (value, isEmail) => {
        this.props.onChange(value, isEmail)
    };

    inputValidation = (e) => {
        if (alphabetRegex.test(e.target.value) === true) {
            if (this.props.disableEmail === true)
                this.setState({wrongFormatPhoneNumber: true, isNumber: true});
            else {
                /* if (e.target.value.search('[a-z]') - 1) {
                     this.setState({charAfterNumberEntered: true})
                 }*/
                // if (this.state.isFirstInputNumCheck === 1 && this.state.count !== 1) {
                //     this.setState({value: e.target.value.substring(this.state.dialCode.toString().length, e.target.value.length)});
                //     let c = this.state.isFirstInputNumCheck;
                //     ++c;
                //     this.setState({isFirstInputNumCheck: c})
                // } else
                this.setState({value: e.target.value});
                this.setState({isEmail: true, isNumber: false, labelTitle: 'Enter the Email',});
                // this.validationEmail(this.state.value);
            }
        } else if (e.target.value === '') {
            this.setState({
                labelTitle: this.props.disablePhoneNumber === false && this.props.disableEmail === false ? 'Enter Email or Phone Number' : this.props.disableEmail ? 'Enter the Phone Number' : 'Enter the Email',
                value: e.target.value,
                isEmail: this.props.disablePhoneNumber ? true : false,
                isNumber: this.props.disableEmail ? true : false,
                count: 1,
                isFirstInputNumCheck: 1,
                // dialCode: this.state.dialCode
                countryCode: this.state.countryCode,
                // dialCode: this.props.disableEmail ? this.state.dialCode : phoneUtil.getCountryCodeForRegion(this.props.defaultCountry)
                dialCode: this.props.disableEmail ? this.state.dialCode : phoneUtil.getCountryCodeForRegion(this.state.countryCode)
            });
        } else if (numberRegex.test(e.target.value[0]) === true) {
            if (this.props.disablePhoneNumber === true)
                this.setState({errorState: true, isEmail: true, value: e.target.value})
            else {
                this.setState({dialCode: this.state.dialCode});
                // if (flag === true) {
                this.setState({
                    value: e.target.value,
                    isEmail: false,
                    isNumber: true,
                    labelTitle: 'Enter the Phone Number',
                    errorState: false
                });
            }
        }
    };

    handleKeyPress = (e) => {
        if (e.keyCode === 8) {
            this.setState({wrongFormatPhoneNumber: false})
        }
        if (e.keyCode === 8) {
            /*if (e.target.value.toString() === this.state.dialCode.toString()) {
                console.log('M')
                this.setState({
                    value: '',
                    count: 1,
                    isFirstInputNumCheck: 1,
                    labelTitle: this.props.disablePhoneNumber === false && this.props.disableEmail === false ? 'Enter Email or Phone Number' : this.props.disableEmail ? 'Enter the Phone Number' : 'Enter the Email',
                    isEmail: this.props.disablePhoneNumber ? true : false,
                    isNumber: this.props.disableEmail ? true : false,
                    dialCode: this.props.disableEmail ? this.state.dialCode : phoneUtil.getCountryCodeForRegion(this.props.defaultCountry)
                })
            }*/
        }
        if (e.keyCode === 8 && e.target.value.length === 1)
            this.setState({errorState: false})
    };

    setDialCode = (dialCode, countryCode) => {
        /*this.setState({dialCode});
        this.setState({countryCode});*/
        // let phoneValue = this.state.value.substring(this.state.dialCode.toString().length, this.state.value.length);
        // console.log(',,,', phoneValue)
        if (!_.isEmpty(this.state.value))
            this.setState({
                dialCode,
                countryCode
            }, () => {
                this.handlePhoneNumberValidation(this.state.value)
            })

    };

    render() {
        const {style, labelStyle, inputFieldStyle} = this.props;
        const errorStyles = StyleSheet.flatten([this.props.labelStyle, styles.errorLabelStyle])
        const errorStyle = {...errorStyles}
        const inputWidth = style.width + 48;

        return (
            <View style={style}>
                <View style={{width: '100%'}}>
                    {
                        !this.props.hideLabel ?
                            <View style={{marginVertical: 2}}>
                                {
                                    this.state.isEmail ?
                                        <Text style={[labelStyle, {width: inputWidth}]}>
                                            {this.state.labelTitle}
                                        </Text>
                                        :
                                        <Text style={[labelStyle, {width: inputWidth}]}>
                                            {this.state.labelTitle}
                                        </Text>
                                }
                            </View> :
                            null
                    }

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            flex: -1,
                            borderColor: this.state.color,
                            borderBottomWidth: this.state.borderBottomWidth, height: 30
                        }}>
                            {this.state.isEmail ?
                                null
                                :
                                this.state.isNumber ?
                                    <FlagSelect
                                        listItemStyle={this.props.listItemStyle}
                                        inputFieldStyle={this.props.inputFieldStyle}
                                        handleCode={this.setDialCode}
                                        color={this.state.color}
                                        wrongFormatPhoneNumber={this.state.wrongFormatPhoneNumber}
                                        defaultCountry={this.state.countryCode || this.props.defaultCountry}
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
                                style={[inputFieldStyle, styles.textInputCommonStyle,
                                    {
                                        borderColor: this.state.color,
                                        borderBottomWidth: this.state.borderBottomWidth
                                    },
                                    this.state.isEmail ?
                                        {width: inputWidth}
                                        :
                                        this.state.isNumber ?
                                            {width: style.width}
                                            :
                                            {width: inputWidth}
                                ]}
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
                                placeholder={this.props.disableEmail === false && this.props.disablePhoneNumber === false ? 'Email or Phone Number' : this.props.disableEmail ? "Phone Number" : "Email"}
                                onChange={(e) => this.inputValidation(e)}
                                onKeyPress={this.handleKeyPress}
                            />
                        </View>

                        {
                            Platform.OS === 'web' ?
                                this.state.errorState ?
                                    <TouchableWithoutFeedback
                                        style={{
                                            flex: 0.14,
                                            cursor: 'none',
                                        }}>
                                        <View style={{
                                            borderColor: this.state.color,
                                            borderBottomWidth: this.state.borderBottomWidth,
                                            height: 30,
                                            justifyContent: 'center',

                                        }}>
                                            <Lottie
                                                options={{
                                                    loop: false,
                                                    autoplay: true,
                                                    // animationData: this.state.errorState ? crossAnimationData : tickAnimationData,
                                                    animationData: crossAnimationData,
                                                    rendererSettings: {
                                                        preserveAspectRatio: 'xMidYMid slice'
                                                    }
                                                }}
                                                height={20}
                                                // width={this.state.errorState ? 50 : 20}
                                                width={this.state.errorState || this.state.wrongFormatPhoneNumber ? 20 : 50}
                                                // isStopped={this.state.isStopped}
                                                // isPaused={this.state.isPaused}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    :
                                    this.state.wrongFormatPhoneNumber ?
                                        <View style={{
                                            flex: 0.14,
                                            justifyContent: 'center',
                                            borderColor: this.state.color,
                                            borderBottomWidth: this.state.borderBottomWidth, height: 30
                                        }}>
                                            <Lottie
                                                options={{
                                                    loop: false,
                                                    autoplay: true,
                                                    // animationData: this.state.wrongFormatPhoneNumber ? crossAnimationData : tickAnimationData,
                                                    animationData: crossAnimationData,

                                                    rendererSettings: {
                                                        preserveAspectRatio: 'xMidYMid slice'
                                                    }
                                                }}
                                                height={20}
                                                // width={this.state.errorState ? 50 : 20}
                                                width={this.state.errorState || this.state.wrongFormatPhoneNumber ? 20 : 50}
                                                // isStopped={this.state.isStopped}
                                                // isPaused={this.state.isPaused}
                                            />
                                        </View>
                                        : this.renderTicks()
                                :
                                <View style={{
                                    flex: -1,
                                    justifyContent: 'center',
                                    borderColor: this.state.color,
                                    borderBottomWidth: this.state.borderBottomWidth, height: 30
                                }}>
                                    <LottieView source={require('../Input/lottieFiles/cross')} autoPlay/>
                                </View>

                        }
                        {/*{
                                this.state.wrongFormatPhoneNumber ?
                                    <Text style={errorStyle}>Invalid phone number format</Text> : null
                            }*/}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputCommonStyle: {
        outline: 'none',
        flex: 1,
        height: 30,

    },
    errorLabelStyle: {
        fontSize: 15,
        color: 'red',
        paddingTop: 2,
        // justifyContent: 'flex-start'

    }
});


CustomInput.propTypes = {
    disableEmail: PropTypes.bool,
    disablePhoneNumber: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    hideLabel: PropTypes.bool,
    labelTitle: PropTypes.string,
    labelStyle: PropTypes.object,
    listItemStyle: PropTypes.object,
    inputFieldStyle: PropTypes.object,
    defaultCountry: PropTypes.string
};
CustomInput.defaultProps = {
    disableEmail: false,
    disablePhoneNumber: false,
    labelTitle: '',
    defaultCountry: '',
    listItemStyle: {height: 60},
    style: {
        width: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default CustomInput;