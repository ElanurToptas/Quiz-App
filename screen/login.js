import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'; // Tarayıcı oturumlarını tamamlamak için
import AsyncStorage from '@react-native-async-storage/async-storage'; // Veriyi depolamak için

WebBrowser.maybeCompleteAuthSession();

function login({ navigation }) {

    const [userInfo, setUserInfo] = React.useState(null); // userInfo ile kullanıcı bilgilerini saklıyoruz.

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "823161277073-5nbh1n3n399gn1ecu688a49t4nbu11qj.apps.googleusercontent.com",
        androidClientId: "823161277073-2ufbu63g5pfe36f86q7cd533tc5rq1t0.apps.googleusercontent.com",
        iosClientId: "823161277073-ie8fvm1hcf0qvdhqu8pu4dp2bh8c866p.apps.googleusercontent.com",
        webClientId: "823161277073-mue1bc1gj63kjor0cvnolj97btqgkq90.apps.googleusercontent.com",
        scopes: ["Profile", "email"], // Google'den hangi verilere erişileceğini belirler.
    });

    React.useEffect(() => { // Google oturum açma yanıtı alındığında çalışır
        handleEffect();
    }, [response]);

    async function handleEffect() {
        //console.warn("token = " + response.authentication.accessToken);

        const user = await getLocalUser(); //Önceden oturum açmış bir kullanıcının bilgilerini alır.

        console.warn("AsyncStorage User  = " + user);
        if (!user) {
            getUserInfo(response.authentication.accessToken);
        } else {
            setUserInfo(user);
        }
    }

    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user");
        if (!data) return null;
        return JSON.parse(data);
    }

    const getUserInfo = async (token) => { // verilen token ile Google API'ye kullanıcı bilgileri için istek yapar.
        if (!token) return;

        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            console.warn(user);
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }
    return (
        <View style={styles.container}>
            {!userInfo ? (
                <Button
                    title="Google"
                    onPress={() => {
                        promptAsync(); // google oturum açma sayfası
                    }}
                />
            ) : (
                <View>
                    <Text> Email: {userInfo.email}</Text>
                    <Text> Full name: {userInfo.name}</Text>

                    <Button
                        title="Remove AsyncStorage Value"
                        onPress={async () => {
                            await AsyncStorage.removeItem("@user");
                        }}
                    />

                </View>
            )}
            <TouchableOpacity style={{
                backgroundColor: "green",
                padding: 8,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 20,
                borderRadius: 5,
                margin: 15,
            }}
                onPress={() => navigation.navigate('QUIZAPP')}>
                <Text style={{ color: "black", textAlign: "center" }}>QuizApp</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default login;