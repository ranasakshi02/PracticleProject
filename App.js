import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import UserProfileScreen from './src/screens/userProfile/UserProfileScreen';
import PaymentScreen from './src/screens/paymentScreen/PaymentScreen';
import LoginScreen from './src/screens/Auth/login/LoginScreen';
const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='loginScreen'>
        <Stack.Screen name="loginScreen" component={LoginScreen} />
        <Stack.Screen name="userProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="paymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;