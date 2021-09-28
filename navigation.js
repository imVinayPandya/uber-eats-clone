import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import RestaurantDetail from './screens/RestaurantDetail';


export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOption = {
        headerShown: false
    };

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Home' screenOptions={screenOption}>
                <Stack.Screen name='Home' component={Home}></Stack.Screen>
                <Stack.Screen name='RestaurantDetail' component={RestaurantDetail}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
