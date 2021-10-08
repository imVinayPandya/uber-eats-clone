import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';

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

export default function MenuItems({ restaurantName, foods, hideCheckbox = false, marginLeft }) {
    const dispatch = useDispatch();

    const selectItem = (item, checkboxValue) => dispatch({
        type: 'ADD_TO_CART',
        payload: {
            ...item,
            restaurantName: restaurantName,
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
                        { hideCheckbox ? <></> : <BouncyCheckbox
                            iconStyle={{
                                borderColor: 'lightgray',
                                borderRadius: 5,
                            }}
                            fillColor='green'
                            onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                            isChecked={isFoodInCart(food, cartItems)}
                        />}
                        <FoodInfo food={food} marginLeft={marginLeft ? marginLeft : 0} />
                        <FoodImage image={food.image} marginLeft={marginLeft ? marginLeft : 0} />
                    </View>
                    <Divider width={0.5} orientation='vertical' style={{ marginHorizontal: 10 }} />
                </View>
            ))}
        </ScrollView>
    )
}

const FoodInfo = ({ marginLeft, ...props}) => (
    <View style={{ width: 240, justifyContent: "space-evenly", marginLeft: marginLeft  }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
);

const FoodImage = ({ marginLeft, ...props}) => (
    <View>
        <Image
            style={{ width: 75, height: 75, borderRadius: 8, marginLeft: marginLeft }}
            source={{ uri: props.image }}
        />
    </View>
);
