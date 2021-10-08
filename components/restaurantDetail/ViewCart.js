import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem';
import firebase from '../../firebase';
import LottieView from 'lottie-react-native';

export default function ViewCart({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { items, restaurantName } = useSelector(state => state.cartReducer.selectedItems);

    const total = items
        .map(item => Number(item.price.replace('$', '')))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = new Number(total).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
    });

    const addOrderToFirebase = () => {
        setLoading(true);
        setModalVisible(false);
        const db = firebase.firestore();
        db.collection('orders').add({
            items,
            restaurantName,
            createdAt: new Date().toISOString()
        }).then(() => {
            setTimeout(() => {
                setLoading(false);
                navigation.navigate('OrderCompleted')
            }, 2500);
        });
    };

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalCheckoutContainer: {
            backgroundColor: 'white',
            padding: 16,
            height: 500,
            borderWidth: 1,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15
        },
        restaurantName: {
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
            marginBottom: 10
        },
        subTotalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15
        },
        subTotalText: {
            textAlign: 'left',
            fontWeight: '600',
            fontSize: 15,
            marginBottom: 10
        }
    });

    const checkoutModalContent = () => {
        return (
            <>
                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.restaurantName}>{restaurantName}</Text>
                        {items.map((item, index) => {
                            return (<OrderItem key={index} item={item} />);
                        })}
                        <View style={styles.subTotalContainer}>
                            <Text style={styles.subTotalText}>Subtotal: </Text>
                            <Text>{totalUSD}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={{
                                marginTop: 20,
                                backgroundColor: 'black',
                                alignItems: 'center',
                                padding: 13,
                                borderRadius: 30,
                                width: 300,
                                position: 'relative'
                            }} onPress={() => addOrderToFirebase()}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Checkout</Text>
                                <Text style={{
                                    position: 'absolute',
                                    right: 20,
                                    color: 'white',
                                    fontSize: 15,
                                    top: 17
                                }}>{total ? totalUSD : ''}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        );
    }

    return (
        <>
            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                {checkoutModalContent()}
            </Modal>

            {total ? (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 10,
                    zIndex: 999
                }}>
                    <View style={{
                        width: "100%",
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'black',
                            alignItems: 'center',
                            position: 'relative',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 20,
                            padding: 15,
                            borderRadius: 30,
                            width: 300,
                        }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                marginRight: 40
                            }}>View Cart</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                            }}>{totalUSD}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : <></>}
            {loading ? (
                <View
                    style={{
                        backgroundColor: "black",
                        position: "absolute",
                        opacity: 0.6,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <LottieView
                        style={{ height: 200 }}
                        source={require("../../assets/animations/scanner.json")}
                        autoPlay
                        speed={3}
                    />
                </View>
            ) : (
                <></>
            )}
        </>
    )
}
