import React from 'react'
import { View, Text, Image } from 'react-native';

const yelpRestaurantInfo = {
    name: 'Farmhouse Kitchen Thai Cuisine',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1013&q=80',
    price: '$$',
    reviews: '2354',
    rating: 4.4,
    categories: [{ title: 'Thai' }, { title: 'Comfort Food' }]

};

export default function About(props) {
    const { name, image, price, reviews, rating, categories } = props.route.params;

    const formattedCategories = categories.map(cat => cat.title).join(" * ");

    const description = `${formattedCategories} ${price ? ' * ' + price : ''}  * 🎟️ * ${rating} ⭐ (${reviews}+)`;
    return (
        <View>
            <RestaurantImage image={image} />
            <RestaurantName name={name} />
            <RestaurantDescription description={description} />
        </View>
    )
};

const RestaurantImage = (props) => (<Image
    source={{ uri: props.image }}
    style={{ width: '100%', height: 180 }}
/>);

const RestaurantName = (props) => (
    <Text
        style={{
            fontSize: 29,
            fontWeight: '600',
            marginTop: 10,
            marginHorizontal: 15
        }}
    >{props.name}</Text>
);

const RestaurantDescription = (props) => (
    <Text style={{
        marginTop: 10,
        marginHorizontal: 15,
        fontWeight: '400',
        fontSize: 15.5
    }}>{props.description}</Text>
);
