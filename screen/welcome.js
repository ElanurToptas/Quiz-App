import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


function Welcome({ navigation }) {
    return (

        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.header}>
                <Text style={styles.text}>Welcome</Text>
                <Image source={require('../assets/image.png')} style={styles.image} />
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('login')} // Login sayfasına yönlendirme
                    activeOpacity={0.9}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('signup')} // Signup sayfasına yönlendirme
                    activeOpacity={0.9}
                >
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        backgroundColor: "orange"
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    text: {
        paddingBottom: 40,
        color: "white",
        fontSize: 50,
        fontWeight: "bold",
        top: 15,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // görselin boyutlarının orantılı olarak ölçeklendirilmesini sağlar.
        marginTop: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end', // Butonları sayfanın altına yerleştirir
        alignItems: 'center',
        paddingBottom: 20,
    },// Alt kenardan biraz boşluk
    button: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'orange',
    },

});

export default Welcome;
