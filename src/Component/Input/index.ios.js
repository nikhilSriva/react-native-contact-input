import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Animated,
    Platform,
    Easing
} from 'react-native'
import FlagSelect from './SubComponent/SelectBox/FlagSelect'
import PropTypes from 'prop-types';
import _ from 'lodash';
const alphabetRegex = new RegExp('[a-zA-Z]+')
const numberRegex = new RegExp('[0-9]+$');
const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export class ContactInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            email: '',
            wrongFormatPhoneNumber: false,
            countryCode: props.defaultCountry || 'IN',
            isEmail: props.disableEmail ? false : true,
            dialCode: props.defaultCountry ? phoneUtil.getCountryCodeForRegion(props.defaultCountry) : '91',
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
        if (!this.props.disableAnimation)
            this.animatedValue = new Animated.Value(0)
        this.animatedColorErrorValue = new Animated.Value(0)
        this.animatedErrorValue = new Animated.Value(0)

    }

    validationEmail = (value) => {
        this.setState({email: value}, () => {
            let emailError;
            this.setState({
                errorState: false,
            });
            if (this.state.email !== '')
            {
                emailError=false
                this.setState({errorState: false})
            }
            if (emailRegex.test(this.state.email) !== true)
            {
                emailError=true
                this.setState({errorState: true});
                this.initShakeOnInvalid(1)

            } else {
                emailError=false
                this.setState({errorState: false});
            }
            if (this.state.email === "")
            {
                emailError=false
                this.setState({
                    errorState: false,
                });
            }
            const parsedObject = {
                email: this.state.value,
                isValid: !emailError
            }
            this._onChange(parsedObject, this.state.isEmail)
        })
    };

    handlePhoneNumberValidation = (number) => {
        if (number !== '' && number.toString().length !== 1) {
            let phoneError = false
            const phoneNumber = phoneUtil.parseAndKeepRawInput(number, this.state.countryCode);
            if (phoneUtil.isValidNumber(phoneNumber)) {
                phoneError = false
                this.setState({wrongFormatPhoneNumber: false});
            } else {
                phoneError = true
                this.setState({wrongFormatPhoneNumber: true});
                this.initShakeOnInvalid(1)

            }

            const parsedObject = {
                dialCode: `+${this.state.dialCode}`,
                phoneNumber: this.state.value,
                parsedNumber: `+${this.state.dialCode}${this.state.value}`,
                isValid: !phoneError
            }
            this._onChange(parsedObject, this.state.isEmail)
        }
    };

    _onChange = (value, isEmail) => {
        this.props.onChange(value, isEmail)
    };

    inputValidation = (e) => {
        if (alphabetRegex.test(e.target.value) === true) {
            if (this.props.disableEmail === true)
                this.setState({wrongFormatPhoneNumber: true, isNumber: true});
            else {
                this.setState({
                    value: e.target.value,
                    errorState: false
                })
                if (!this.props.disableAnimation) {
                    this.initAnimation(0)
                    setTimeout(() => {
                        this.setState({
                            isEmail: true,
                            isNumber: false,
                            labelTitle: 'Enter the Email',
                        })
                    }, 120);
                } else {
                    this.setState({
                        isEmail: true,
                        isNumber: false,
                        labelTitle: 'Enter the Email',
                    })
                }
                // this.validationEmail(this.state.value);
            }
        } else if (e.target.value === '') {
            if (!this.props.disableAnimation) {
                if (!this.props.disableEmail) {
                    this.initAnimation(0)
                    setTimeout(() => this.setState({
                        labelTitle: this.props.disablePhoneNumber === false && this.props.disableEmail === false ? 'Enter Email or Phone Number' : this.props.disableEmail ? 'Enter the Phone Number' : 'Enter the Email',
                        value: '',
                        count: 1,
                        isEmail: this.props.disablePhoneNumber ? this.props.disablePhoneNumber : ContactInput.defaultProps.disablePhoneNumber ? true : false,
                        isNumber: this.props.disableEmail ? this.props.disableEmail : ContactInput.defaultProps.disableEmail ? true : false,
                        isFirstInputNumCheck: 1,
                        countryCode: this.state.countryCode,
                        dialCode: this.props.disableEmail ? this.state.dialCode : phoneUtil.getCountryCodeForRegion(this.state.countryCode)
                    }), 120)
                } else {
                    this.setState({
                        labelTitle: this.props.disablePhoneNumber === false && this.props.disableEmail === false ? 'Enter Email or Phone Number' : this.props.disableEmail ? 'Enter the Phone Number' : 'Enter the Email',
                        value: '',
                        count: 1,
                        isEmail: this.props.disablePhoneNumber ? this.props.disablePhoneNumber : ContactInput.defaultProps.disablePhoneNumber ? true : false,
                        isNumber: this.props.disableEmail ? this.props.disableEmail : ContactInput.defaultProps.disableEmail ? true : false,
                        isFirstInputNumCheck: 1,
                        countryCode: this.state.countryCode,
                        dialCode: this.props.disableEmail ? this.state.dialCode : phoneUtil.getCountryCodeForRegion(this.state.countryCode)
                    })
                }
            } else {
                this.setState({
                    labelTitle: this.props.disablePhoneNumber === false && this.props.disableEmail === false ? 'Enter Email or Phone Number' : this.props.disableEmail ? 'Enter the Phone Number' : 'Enter the Email',
                    value: '',
                    count: 1,
                    isEmail: this.props.disablePhoneNumber ? this.props.disablePhoneNumber : ContactInput.defaultProps.disablePhoneNumber ? true : false,
                    isNumber: this.props.disableEmail ? this.props.disableEmail : ContactInput.defaultProps.disableEmail ? true : false,
                    isFirstInputNumCheck: 1,
                    countryCode: this.state.countryCode,
                    dialCode: this.props.disableEmail ? this.state.dialCode : phoneUtil.getCountryCodeForRegion(this.state.countryCode)
                })
            }

        } else if (numberRegex.test(e.target.value[0]) === true) {
            if (this.props.disablePhoneNumber === true)
                this.setState({errorState: true, isEmail: true, value: e.target.value})
            else {

                this.setState({dialCode: this.state.dialCode});
                this.setState({
                    value: e.target.value,
                    wrongFormatPhoneNumber:false,
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
        /*if (e.keyCode === 8) {
            if (e.target.value.toString() === this.state.dialCode.toString()) {
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
            }
        }*/
        if (e.keyCode === 8 && e.target.value.length === 1)
            this.setState({errorState: false})
    };

    setDialCode = (dialCode, countryCode) => {
        if (!_.isEmpty(this.state.value))
            this.setState({
                dialCode,
                countryCode
            }, () => {
                this.handlePhoneNumberValidation(this.state.value)
            })

    };
    initAnimation = (toValue) => {
        Animated.spring(this.animatedValue, {
            toValue: toValue,
            // velocity:5
            speed: 15,
            useNativeDriver: true
            // duration: 400,

        })
            .start()
    }
    initOnValidAnimation = (toValue) => {
        Animated.timing(this.animatedColorErrorValue, {
            toValue: toValue,
            // velocity:5
            useNativeDriver: true,
            duration: 200
        })
            .start()
    }

    /*handleOnValidAnimations = () => {
        if (this.state.isEmail) {
            if (emailRegex.test(this.state.value) !== true)
                return
            else {
                this.initOnValidAnimation(0)
                // return <View style={{
                //     borderColor: this.state.color,
                //     height: 30,
                //     justifyContent: 'center',
                //     width: 20,
                //     borderBottomWidth: this.state.borderBottomWidth
                // }}>
                //     {/!*<AnimatedTick/>*!/}
                //     {/!*<Lottie
                //         options={{
                //             loop: false,
                //             autoplay: true,
                //             animationData: tickAnimationData,
                //             rendererSettings: {
                //                 preserveAspectRatio: 'xMidYMid slice'
                //             }
                //         }}
                //         height={20}
                //         // width={this.state.errorState ? 50 : 20}
                //         width={this.state.errorState || this.state.wrongFormatPhoneNumber ? 20 : 55}
                //         // isStopped={this.state.isStopped}
                //         // isPaused={this.state.isPaused}
                //     />*!/}
                // </View>
            }
        } else {
            if (this.state.value !== '' && this.state.value.toString().length !== 1) {
                if (numberRegex.test(this.state.value) === true) {
                    const phoneNumber = phoneUtil.parseAndKeepRawInput(this.state.value, this.state.countryCode);
                    if (phoneUtil.isValidNumber(phoneNumber)) {
                        this.initOnValidAnimation(0)
                        {/!**!/
                        }
                        {/!*<Lottie
                                options={{
                                    loop: false,
                                    autoplay: true,
                                    animationData: tickAnimationData,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }
                                }}
                                height={20}
                                // width={this.state.errorState ? 50 : 20}
                                width={this.state.errorState || this.state.wrongFormatPhoneNumber ? 20 : 55}
                                // isStopped={this.state.isStopped}
                                // isPaused={this.state.isPaused}
                            />*!/
                        }

                    } else
                        return
                }
            }
        }
    }*/

    initShakeOnInvalid = (toValue) => {
        Animated.sequence([
            Animated.timing(this.animatedColorErrorValue, {
                toValue: toValue,
                // velocity:5
                useNativeDriver: true,
                duration: 200
            }),
            Animated.timing(this.animatedErrorValue, {
                toValue: 1,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            // return to begin position
            Animated.timing(this.animatedErrorValue, {
                toValue: 0,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(this.animatedErrorValue, {
                toValue: 1,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            // return to begin position
            Animated.timing(this.animatedErrorValue, {
                toValue: 0,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ])
            .start()
    }

    render() {
        if (this.state.isEmail) {
            if (!this.state.errorState)
                this.initOnValidAnimation(0)
        } else {
            if (!this.state.wrongFormatPhoneNumber)
                this.initOnValidAnimation(0)
        }


        const {style, labelStyle, inputFieldStyle} = this.props;
        // const errorStyles = StyleSheet.flatten([this.props.labelStyle, styles.errorLabelStyle])
        // const errorStyle = {...errorStyles}
        let animatedValues = {
            marginLeft: 0.0,
            opacity: 0.0
        }

        const color = this.animatedColorErrorValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#0098EF', '#E84242']
        })

        const translateX = this.animatedErrorValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 5]
        })
        if (!this.props.disableAnimation) {
            animatedValues = {
                marginLeft: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 0]
                }),
                opacity: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                })
            }
        }
        return (
            <View style={style}>
                <View style={{width: '100%'}}>
                    {
                        !this.props.hideLabel ?
                            <Animated.View style={{
                                marginVertical: 2, transform: [
                                    {
                                        translateX: translateX,
                                    }
                                ]
                            }}>
                                {
                                    this.state.isEmail ?
                                        <Text style={[labelStyle, {width: '100%'}]}>
                                            {this.state.labelTitle}
                                        </Text>
                                        :
                                        <Text style={[labelStyle, {width: '100%'}]}>
                                            {this.state.labelTitle}
                                        </Text>
                                }
                            </Animated.View> :
                            null
                    }

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {this.state.isEmail ?
                            null
                            :
                            this.state.isNumber ?
                                <Animated.View style={{
                                    flex: -1,
                                    borderColor: color,
                                    borderBottomWidth: this.state.borderBottomWidth, height: 30,
                                    transform: [
                                        {
                                            translateX: translateX
                                        }
                                    ]
                                }}>
                                    <FlagSelect
                                        animatedInstance={this.animatedValue}
                                        initAnimation={this.initAnimation}
                                        countryMenuWidth={style.width}
                                        disableAnimation={this.props.disableAnimation}
                                        listItemStyle={this.props.listItemStyle}
                                        inputFieldStyle={this.props.inputFieldStyle}
                                        handleCode={this.setDialCode}
                                        color={this.state.color}
                                        wrongFormatPhoneNumber={this.state.wrongFormatPhoneNumber}
                                        defaultCountry={this.state.countryCode || this.props.defaultCountry}
                                    />
                                </Animated.View>
                                :
                                null
                        }
                        <Animated.View style={{
                            zIndex: -999,
                            flex: 1,
                            borderColor: color,
                            transform: [
                                {
                                    translateX: translateX
                                }
                            ],
                            borderBottomWidth: this.state.borderBottomWidth,
                            height: 30
                        }}>
                            <TextInput
                                type={this.state.isEmail ? 'text' : 'number'}
                                autoCorrect={false}
                                style={[inputFieldStyle, styles.textInputCommonStyle,
                                    {
                                        // borderColor: color,
                                        // borderBottomWidth: this.state.borderBottomWidth,

                                    },
                                    {width: '100%'}
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
                                                },
                                                this.validationEmail(this.state.value))
                                        } : () => {
                                            this.setState({
                                                    color: '#DCDCDC',
                                                    borderBottomWidth: 1
                                                },
                                                this.handlePhoneNumberValidation(this.state.value))
                                        }}
                                placeholder={this.props.disableEmail === false && this.props.disablePhoneNumber === false ? 'Email or Phone Number' : this.props.disableEmail ? "Phone Number" : "Email"}
                                onChange={(e) => this.inputValidation(e)}
                                onKeyPress={this.handleKeyPress}
                            />
                        </Animated.View>
                        {/*{
                            this.state.errorState ?
                                <Text>a</Text> :
                                this.state.wrongFormatPhoneNumber ?
                                    this.handleOnValidAnimations(0)
                                    : null

                        }
*/}
                        {/*{
                        //////animationsHandlingErrorModule
                            !this.props.disableFeedbackAnimations ?
                                (Platform.OS === 'web' ?
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
                                                    cursor: 'none',
                                                }}>
                                                    <Lottie
                                                        options={{
                                                            loop: false,
                                                            autoplay: true,
                                                            animationData: crossAnimationData,
                                                            rendererSettings: {
                                                                preserveAspectRatio: 'xMidYMid slice'
                                                            }
                                                        }}
                                                        height={20}
                                                        // width={this.state.errorState ? 50 : 20}
                                                        width={this.state.errorState || this.state.wrongFormatPhoneNumber ? 20 : 50}
                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            :
                                            this.state.wrongFormatPhoneNumber ?
                                                <View style={{
                                                    flex: 0.14,
                                                    justifyContent: 'center',
                                                    borderColor: this.state.color,
                                                    cursor: 'none',
                                                    borderBottomWidth: this.state.borderBottomWidth, height: 30
                                                }}>
                                                    <Lottie
                                                        options={{
                                                            loop: false,
                                                            autoplay: true,
                                                            animationData: crossAnimationData,

                                                            rendererSettings: {
                                                                preserveAspectRatio: 'xMidYMid slice'
                                                            }
                                                        }}
                                                        height={20}
                                                        // width={this.state.errorState ? 50 : 20}
                                                        width={this.state.errorState || this.state.wrongFormatPhoneNumber ? 20 : 50}
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
                                            <LottieView source={require('./lottieFiles/cross')} autoPlay/>
                                        </View>
                                )
                                :
                                null
                        }*/}
                    </View>
                    { /*
                        //////textErrorHandlingModule
                    {
                        this.props.disableLottieAnimations ?
                            <View style={{zIndex: -99}}>
                                {this.state.errorState ?
                                    <Text style={errorStyle}>Invalid Email</Text> : null
                                }
                                {
                                    this.state.wrongFormatPhoneNumber ?
                                        <Text style={errorStyle}>Invalid Phone Number Format</Text> : null
                                }

                            </View> : null
                    }*/}
                </View>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
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


ContactInput
    .propTypes = {
    disableEmail: PropTypes.bool,
    disablePhoneNumber: PropTypes.bool,
    disableAnimation:PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    hideLabel: PropTypes.bool,
    labelTitle: PropTypes.string,
    labelStyle: PropTypes.object,
    listItemStyle: PropTypes.object,
    inputFieldStyle: PropTypes.object,
    defaultCountry: PropTypes.string
};
ContactInput
    .defaultProps = {
    disableEmail: false,
    disablePhoneNumber: false,
    disableAnimation:false,
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

export default ContactInput;