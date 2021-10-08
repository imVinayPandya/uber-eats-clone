import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';

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

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        marginHorizontal: 10
    },

    titleStyle: {
        fontSize: 19,
        fontWeight: "600",
    },
});

export default function MenuItems(props) {
    const dispatch = useDispatch();

    const selectItem = (item, checkboxValue) => dispatch({
        type: 'ADD_TO_CART',
        payload: {
            ...item,
            restaurantName: props.restaurantName,
            checkboxValue
        }
    });

    const cartItems = useSelector(state => state.cartReducer.selectedItems.items);
    const isFoodInCart = (food, cartItems) => {
        return Boolean(cartItems.find(item => item.title === food.title));
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {foods.map((food, index) => (
                <View key={food.title + index}>
                    <View style={styles.menuItemStyle}>
                        <BouncyCheckbox
                            iconStyle={{
                                borderColor: 'lightgray',
                                borderRadius: 5,
                            }}
                            fillColor='green'
                            onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                            isChecked={isFoodInCart(food, cartItems)}
                        />
                        <FoodInfo food={food} />
                        <FoodImage image={food.image} />
                    </View>
                    <Divider width={0.5} orientation='vertical' style={{ marginHorizontal: 10 }} />
                </View>
            ))}
        </ScrollView>
    )
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly" }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
);

const FoodImage = (props) => (
    <View>
        <Image
            style={{ width: 75, height: 75, borderRadius: 8 }}
            source={{ uri: props.image }}
        />
    </View>
);
