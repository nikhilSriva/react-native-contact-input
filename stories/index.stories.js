import React from 'react';
import {storiesOf} from '@storybook/react-native';
import ContactInput from "../src/Component/Input";

storiesOf('react-native-contact-input', module)
    .add('Both Email or Phone Number', () => <ContactInput onChange={(value) => console.log(value)}
                                                          style={{width: 200}}/>)

    .add('Email Input', () => <ContactInput onChange={(value) => console.log(value)}
                                           disablePhoneNumber={true}
                                                      style={{width: 200}}/>)
    .add('Phone Number Input', () => <ContactInput onChange={(value) => console.log(value)}
                                                  disableEmail={true}
                                                  style={{width: 200}}/>);

