// import { Body, Button, Card, CardItem, Center, Container, Content, Header, Heading, Icon, Left, List, Right, Thumbnail } from "native-base";
import React, { Component } from "react";
import {
   View,
   Text,
   StyleSheet,
   SafeAreaView,
   ScrollView,
   TextInput,
   BackHandler,
   Alert,
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   Platform,
   Keyboard,
   ToastAndroid
} from "react-native";
import { appStyles } from "../config/AppStyle";
import MyFontsSize from '../config/FontStyles'
import MYColors from '../config/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Input, Icon, Divider, Button, Header } from "react-native-elements";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }

    Login = () => {
        if(this.state.userName.trim() == "" && this.state.password.trim() == ""){
            ToastAndroid.show("User name/Password cannot be empty.",ToastAndroid.SHORT);
        } else if(this.state.userName.trim() == ""){
            ToastAndroid.show("Please enter user name.",ToastAndroid.SHORT);
        } else if(this.state.password.trim() == ""){
            ToastAndroid.show("Please enter password.",ToastAndroid.SHORT);
        } else if(this.state.userName.trim() == "Test@user" && this.state.password.trim() == "Password@1"){
            this.props.navigation.replace("ListScreen");
        } else{
            ToastAndroid.show("User name/Password incorrect.",ToastAndroid.SHORT);
        }
        
    }

    render() {
        const { userName, password } = this.state;
        return (
            <>
            <SafeAreaView>

               <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                  style={appStyles.body}
               >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                     <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={appStyles.scrollView}>

                        <Header
                           statusBarProps={{ barStyle: 'default', translucent: true }}
                           barStyle="default"
                           containerStyle={{
                              backgroundColor: MYColors.lightColor,
                              height: 'auto',
                              borderBottomColor: '#ccc'
                           }}
                           centerComponent={{
                              text: 'Login', style: {
                                 fontSize: MyFontsSize.avatar.fontSize,
                                 flex: 1,
                                 width: wp('100%'),
                                 textAlign: "center",
                                 fontWeight: 'bold'
                              }
                           }}
                        />
                        <View>
                           <Text style={{ ...appStyles.sectionDescription, paddingTop: 10 }}>
                              login with us to check {'\r\n'}<Text style={appStyles.highlight}>Trending Repositories</Text>
                                </Text>
                        </View>
                        <View style={{ ...appStyles.container, flexDirection: 'column', width: '90%', alignSelf: "center" }}>
                           <Input
                              labelStyle={{ ...appStyles.labelInput }}
                              inputContainerStyle={{ borderBottomWidth:0 }}
                              inputStyle={{...appStyles.formInput, padding: 10, }}
                              autoCorrect={false}
                              // keyboardType=""
                              maxLength={10}
                              textContentType="givenName"
                              onChangeText={(userName) => this.setState({userName})}
                              placeholder='User Name'
                           />
                           <Input
                              labelStyle={{ ...appStyles.labelInput }}
                              inputContainerStyle={{ ...appStyles.formInput, paddingRight:10 }}
                              inputStyle={{padding: 10, }}
                              autoCorrect={false}
                              // keyboardType=""
                              maxLength={10}
                              textContentType="password"
                              onChangeText={(password) => this.setState({password})}
                              secureTextEntry={this.state.showPassword}
                              placeholder='Password'
                           />
                           {/* <View> */}
                           <Button
                              onPress={() => {
                                 this.Login();
                              }}
                              title='Login'
                              raised
                              containerStyle={{ ...appStyles.submitButton, marginVertical: hp('2%') }}
                              titleStyle={{ fontSize: MyFontsSize.xlargeText.fontSize }}
                              buttonStyle={{ backgroundColor: MYColors.ButtonColor }}
                           />
                           {/* </View> */}
                        </View>
                        {/* </View> */}
                     </ScrollView>
                  </TouchableWithoutFeedback>
               </KeyboardAvoidingView>
            </SafeAreaView>
         </>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});