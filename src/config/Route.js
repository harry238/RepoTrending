
import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from '../screens/User/Login';
// import OTPScreen from '../screens/User/OTP';
// import HomeScreen from '../screens/Home/Home';
// import ChatScreen from '../screens/Chats/Chat';
// import ChatInfoScreen from '../screens/Chats/ChatInfo';
import { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { appStyles } from './AppStyle';

const Stack = createStackNavigator();


class LoginPage extends Component{
    render(){
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>LoginPage</Text>
            </View>
        );
    }
}

class StackNavigation {
    render() {
        return (
            <SafeAreaView>
                <ScrollView
                        style={appStyles.scrollView}>
                    <Stack.Navigator initialRouteName={this.state.isLoggedIn ? 'Home' : 'Login'}>
                        <Stack.Screen name='Login' component={LoginPage} />
                        {/* <Stack.Screen name='OTP' component={OTPScreen} />
                        <Stack.Screen name='Home' component={HomeScreen} />
                        <Stack.Screen name='Chat' component={ChatScreen} />
                        <Stack.Screen name='ChatInfo' component={ChatInfoScreen} /> */}
                    </Stack.Navigator>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default StackNavigation;