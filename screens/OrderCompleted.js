import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import firebase from '../firebase';
import MenuItems from '../components/restaurantDetail/MenuItems';

export default function OrderCompleted() {
    const [ lastOrder, setLastOrder ] = useState({ items: [] });
    const { items, restaurantName } = useSelector(state => state.cartReducer.selectedItems);

    const total = items
        .map(item => Number(item.price.replace('$', '')))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = new Number(total).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
    });

    useEffect(() => {
        const db = firebase.firestore();
        setLastOrder(db.collection('orders').get());
        //const unsubscribe = db.collection('orders')
        // .orderBy('createdAt', 'desc')
        // .limit(1)
        // .onSanpshot((snapshot) => {
        //     snapshot.does.map((doc) => {
        //         setLastOrder(doc.data())
        //     })
        // })
        // return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{ marginHorizontal: 15, alignItems: 'center', height: '100%' }}
            >
                {/* Green check mark */}
                <LottieView style={{
                    height: 100,
                    alignSelf: 'center',
                    marginBottom: 30
                }}
                    source={require('../assets/animations/check-mark.json')}
                    autoPlay
                    speed={0.5}
                    loop={false}
                />
                <Text style={{
                    textAlign: 'center',
                    marginBottom: 15,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Your order at {restaurantName} has been placed for {totalUSD}</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Menu items */}
                    <MenuItems
                        foods={lastOrder.items}
                        hideCheckbox={true}
                    />
                    {/* Cooking animation */}
                    <LottieView style={{
                        height: 200,
                        alignSelf: 'center',
                    }}
                        source={require('../assets/animations/cooking.json')}
                        autoPlay
                        speed={0.5}
                        loop={true}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff'
    },
});
