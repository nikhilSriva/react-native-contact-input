import React from 'react';
import {Text, View, TextInput,StyleSheet,Image} from 'react-native'
import FlagSelect from "./SubComponent/SelectBox/Select";

const alphabetRegex = new RegExp('[a-zA-Z]+')
const numberRegex = new RegExp('[0-9]+$');
const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export class CustomInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            email: '',
            wrongFormatPhoneNumber:false,
            dialCode: 91,
            phNumber: 0,
            isEmail: true,
            isNumber: false,
            labelTitle: 'Email or Phone Number',
            errorState: false,
            count: 1
        };
    }

    validationEmail = (e) => {
        this.setState({email: e.target.value}, () => {
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

        })
    };


    inputValidation = (e) => {
        if (alphabetRegex.test(e.target.value) === true) {
            this.setState({isEmail: true, isNumber: false, labelTitle: 'Enter your Email', value: e.target.value})
            this.validationEmail(e)
        } else if (e.target.value === '')
            this.setState({labelTitle: 'Email or Phone Number', value: '', isEmail: true, count: 1, dialCode: 91})
        else if (numberRegex.test(e.target.value[0]) === true) {
            this.setState({dialCode: this.state.dialCode})

            if (this.state.count === 1) {
                this.setState({
                    value: this.state.dialCode+e.target.value,
                    isEmail: false,
                    isNumber: true,
                    labelTitle: 'Enter the Phone Number',
                    errorState: false
                })
                let c = this.state.count;
                ++c;
                this.setState({count: c})
            } else {
                this.setState({
                    phNumber: e.target.value,
                    isEmail: false,
                    isNumber: true,
                    labelTitle: 'Enter the Phone Number',
                    value: e.target.value,
                    errorState: false
                })
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
    setDialCode = (dialCode) => {
        this.setState({dialCode})
        let phoneValue = this.state.value.substring(this.state.dialCode.toString().length, this.state.value.length);
        this.setState({
            value: dialCode+phoneValue,
        },()=>this.handlePhoneNumberValidation(this.state.value))

    };
    handlePhoneNumberValidation=(number)=>{
        const phoneNumber=phoneUtil.parseAndKeepRawInput(number,'IN');
                if(phoneUtil.isValidNumber(phoneNumber))
                    this.setState({wrongFormatPhoneNumber:false})
                else
                    this.setState({wrongFormatPhoneNumber:true})

    };

    render() {
        return (
            <View style={{marginTop: 20}}>
                <View style={{paddingLeft: 10}}>
                    {this.state.isEmail ?
                        this.state.labelTitle === 'Enter your Email' ?
                            <Text>
                                {this.state.labelTitle}
                            </Text> :
                            <Text>
                                {this.state.labelTitle}
                            </Text> :
                        <Text>
                            {this.state.labelTitle}
                        </Text>
                    }
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={{}}>
                        {this.state.isEmail ?
                            <View style={{
                                paddingLeft: 2,
                                flexDirection: 'row',
                                width: 48,
                                marginRight: 21,
                                paddingTop: 2,
                                justifyContent: 'center',
                            }}>
                                <Image source={require('../../assets/mail-black-envelope-symbol.png')}
                                                 style={{borderRadius: 6, width: 30, height: 20}}/>
                            </View>
                            :
                            <FlagSelect
                                handleCode={this.setDialCode}
                            />}
                    </View>
                    <View style={{zIndex:-999}}>
                        <TextInput
                            type={this.state.isEmail ? 'text' : 'number'}
                            autoCorrect={false}
                            autoFocus
                            style={this.state.isEmail?[styles.inputStyles,{marginLeft:-20}]:styles.inputStyles}
                            value={this.state.value}
                            placeholderTextColor='#ccc'
                            onBlur={this.state.isEmail?null:()=>{this.handlePhoneNumberValidation(this.state.value)}}
                            onChange={(e) => this.inputValidation(e)}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Email/Phone Number"
                        />
                    </View>
                </View>
                <View>
                    {this.state.errorState ?
                        this.state.labelTitle === 'Enter your Email' ?
                            <Text style={{color: 'red', paddingLeft: 10}}>Invalid Email</Text>: null : null
                    }
                    {
                        this.state.wrongFormatPhoneNumber?
                            <Text style={{color: 'red', paddingLeft: 10}}>Invalid Phone Number Format</Text>: null
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    inputStyles:{
        fontSize: 16,
        outline: 'none',
        borderBottomColor: '#ccc',
        paddingTop: 3,
        width: 194,
        borderBottomWidth: 0.7
    }
})
export default CustomInput;