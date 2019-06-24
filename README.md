#React-Native-Contact-Input
Single switchable component for email and phone number (web & react-native support) :globe_with_meridians::iphone:

![license](https://img.shields.io/github/license/VISI-ONE/create-react-native-web-app.svg)
![GitHub top language](https://img.shields.io/github/languages/top/VISI-ONE/create-react-native-web-app.svg)
![npm](https://img.shields.io/npm/v/create-react-native-web-app.svg)

## Installation and usage

Install the package via ```npm```:
```sh
npm install --save react-native-contact-input
```
Then use it in your app:
```sh
import React, { Component } from 'react';
import ContactInput from 'react-native-contact-input';

class App extends Component
{

    handleChange=(value)=>{
        console.log(value)
    }
    // => {dialCode: "+91"
           parsedNumber: "+913528712361"
           phoneNumber: "3528712361"}
    
  render()
  {
    return (
        <ContactInput
            onChange={(value,state)=>this.handleChange(value)}
            disableEmail={true}
            style={{
              width:200,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',}}
        />
    );
  }
}
```
## Props


<table width="110%">
  <tr>
    <td><b>Name</b></td>
    <td><b>Type</b></td>
    <td><b>Required</b></td>
    <td><b>Default</b></td>
    <td><b>Description</b></td>
  </tr>
  <tr>
    <td>defaultCountry</td>
    <td>string</td>
    <td>no</td>
    <td>'IN'</td>
    <td>sets default country code and flag for the initial render</td>
  </tr>
  <tr bgcolor="#f4f4f4">
    <td>disableEmail</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>option whether to disable email input or not</td>
  </tr>
  
   <tr>
       <td>disablePhoneNumber</td>
       <td>boolean</td>
       <td>no</td>
       <td>false</td>
       <td>option whether to disable phone number input or not</td>
     </tr>
     <tr>
       <td>disableAnimation</td>
       <td>boolean</td>
       <td>no</td>
       <td>false</td>
       <td>option whether to disable animation while switching between email or phone number (only applicable when <code>disablePhone</code> and <code>disablePhoneNumber</code> is <code>false</code>)</td>
     </tr>
     <tr bgcolor="#f4f4f4">
                     <td>hideLabel</td>
                     <td>boolean</td>
                     <td>no</td>
                     <td>false</td>
                     <td>option whether to hide or show label</td>
                   </tr>
     <tr>
         <td>onChange</td>
         <td>function</td>
         <td>yes</td>
         <td>-</td>
         <td>Callback which returns the validated output object</td>
       </tr>
       <tr bgcolor="#f4f4f4">
           <td>style</td>
           <td>object</td>
           <td>yes</td>
           <td>{
                        width: 200,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }</td>
           <td>styles which are apllied to the container element</td>
         </tr>
   <tr>
                   <td>labelTitle</td>
                   <td>string</td>
                   <td>no</td>
                   <td>' '</td>
                   <td>content of the label to display</td>
                 </tr>
     <tr bgcolor="#f4f4f4">
                        <td>labelStyle</td>
                        <td>object</td>
                        <td>no</td>
                        <td>{}</td>
                        <td>styles which are applied to labels</td>
                      </tr>   
        <tr>
                                <td>listItemStyle</td>
                                <td>object</td>
                                <td>no</td>
                                <td>{height:60}</td>
                                <td>styles which are applied to individual items in list</td>
                              </tr>
        <tr bgcolor="#f4f4f4">
                                        <td>inputFieldStyle</td>
                                        <td>object</td>
                                        <td>no</td>
                                        <td>{}</td>
                                        <td>styles which are applied to input box in the component</td>
                                      </tr>                 
         
</table>

##Contributing:
All your suggestions and PRs are welcome.
