import React from 'react'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import About from '../components/restaurantDetail/About'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'

const foods = [
    {
        title: 'Pav bhaji',
        description: 'This is delicious Indian fast food dish. You should try this before you die.',
        price: '$10.5',
        image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Instant-Pot-Mumbai-Pav-Bhaji.jpg'
    },
    {
        title: 'Fafda',
        description: 'This is delicious Indian fast food dish. You should try this before you die.',
        price: '$20.25',
        image: 'https://kvfoods.in/wp-content/uploads/2020/08/FAFDA.jpg'
    },
    {
        title: 'Dhokla',
        description: 'This is delicious Indian fast food dish. You should try this before you die.',
        price: '$10.00',
        image: 'https://mk0geekrobocook3p2m6.kinstacdn.com/wp-content/uploads/2021/02/Dhokla-Gujarati-Dish.jpg'
    },
    {
        title: 'Thepla',
        description: 'This is delicious Indian fast food dish. You should try this before you die.',
        price: '$5.65',
        image: 'https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2020/Methi_Thepla_Recipe_Soft_Gujarati_Thepla_11_1600.jpg'
    },
    {
        title: 'Rabdi',
        description: 'This is delicious Indian fast food dish. You should try this before you die.',
        price: '$50.78',
        image: 'https://www.ruchiskitchen.com/wp-content/uploads/2015/11/rabdi-recipe-5.jpg'
    }
];

export default function RestaurantDetail({ route, navigation }) {
    return (
        <View style={{ height: '100%' }}>
            <About route={route} />
            <Divider width={1.8} style={{ marginVertical: 20 }} />
            <MenuItems foods={foods} restaurantName={route.params.name} />
            <ViewCart navigation={navigation} />
        </View>
    )
}


