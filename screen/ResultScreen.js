import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function QuizScreen({ navigation }) {
    const route = useRoute(); // answer ve point parametreleri almak için kullandık.
    // console.log(route.params);

    return (
        <SafeAreaView style={{ marginTop: 40, marginHorizontal: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Your Results
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginRight: 14, }}>
                    <Text style={{ fontWeight: "bold" }} >Share</Text>
                    <AntDesign style={{ marginLeft: 4, }} name="sharealt" size={18} color="black" />
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10, }}>
                <Text style={{ fontWeight: "bold" }}>Questions answered</Text>
                <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>(5/5)</Text>
            </View>
            <Pressable style={{ backgroundColor: "#FFA500", height: 200, borderRadius: 10, marginTop: 20 }}>
                <Text style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 8,
                }}> Score Card</Text>
                <FlatList
                    numColumns={2}
                    data={route.params.answers}
                    renderItem={({ item, i }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                        >
                            <Text>{item.question}</Text>
                            {item.answer === true ? (
                                <AntDesign
                                    style={{ marginLeft: 5 }}
                                    name="checkcircle"
                                    size={20}
                                    color="green" />
                            ) : (
                                <AntDesign
                                    style={{ marginLeft: 5 }}
                                    name="closecircle"
                                    size={20}
                                    color="red" />
                            )}
                        </View>
                    )}
                />
            </Pressable>
            <View>
                <TouchableOpacity style={{ backgroundColor: "green", padding: 8, marginLeft: "auto", marginRight: "auto", marginBottom: 20, borderRadius: 5, margin: 15, }} onPress={() => navigation.navigate('QUIZAPP')}>
                    <Text style={{ color: "black", textAlign: "center" }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

export default QuizScreen