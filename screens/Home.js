import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Categories from '../components/home/Categories';
import HeaderTabs from '../components/home/HeaderTabs';
import RestaurantItems from '../components/home/RestaurantItems';
import SearchBar from '../components/home/SearchBar';
import BottomTabs from '../components/home/BottomTabs';

const YELP_API_KEY = "";

const localRestaurants = [
    {
        name: 'Beachside Bar',
        image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1013&q=80',
        categories: [{ title: 'Cafe' }, { title: 'Bar' }],
        price: '$4',
        review_count: 1244,
        rating: 4.5
    },
    {
        name: 'Benihama',
        image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1013&q=80',
        categories: [{ title: 'Cafe' }, { title: 'Bar' }],
        price: '$$',
        review_count: 1424,
        rating: 3.7
    },
    {
        name: 'India\'s grill',
        image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1013&q=80',
        categories: [{ title: 'Cafe' }, { title: 'Bar' }],
        price: '$$',
        review_count: 2356,
        rating: 4.9
    }
];

export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState([]);
    const [city, setCity] = useState('SanDiago');
    const [activeTab, setActiveTab] = useState('Delivery');

    const getRestaurantsFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        };
        return fetch(yelpUrl, apiOptions)
            .then(res => res.json())
            .then(json => json?.businesses.filter(business => business?.transactions?.includes(activeTab.toLocaleLowerCase())))
            .then(setRestaurantData);
    };


    useEffect(() => {
        // getRestaurantsFromYelp();
        setRestaurantData(localRestaurants);
    }, [city, activeTab]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar setCity={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                <RestaurantItems restaurantData={restaurantData} navigation={navigation} />
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#eee'
    },
    headerContainer: {
        backgroundColor: '#fff',
        padding: 15
    }
});
