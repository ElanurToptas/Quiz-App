import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'; // Tarayıcı oturumlarını tamamlamak için
import AsyncStorage from '@react-native-async-storage/async-storage'; // Veriyi depolamak için

WebBrowser.maybeCompleteAuthSession();

function login({ navigation }) {

    const [userInfo, setUserInfo] = React.useState(null); // userInfo ile kullanıcı bilgilerini saklıyoruz.
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "823161277073-5nbh1n3n399gn1ecu688a49t4nbu11qj.apps.googleusercontent.com",
        androidClientId: "823161277073-2ufbu63g5pfe36f86q7cd533tc5rq1t0.apps.googleusercontent.com",
        iosClientId: "823161277073-ie8fvm1hcf0qvdhqu8pu4dp2bh8c866p.apps.googleusercontent.com",
        webClientId: "823161277073-mue1bc1gj63kjor0cvnolj97btqgkq90.apps.googleusercontent.com",
        scopes: ["email"], // Google'den hangi verilere erişileceğini belirler.
    });

    React.useEffect(() => { // Google oturum açma yanıtı alındığında çalışır
        handleEffect();
    }, [response]);

    async function handleEffect() {
        //console.warn("token = " + response.authentication.accessToken);

        const user = await getLocalUser(); //Önceden oturum açmış bir kullanıcının bilgilerini alır.

        if (!user && response?.type === 'success') {
            getUserInfo(response.authentication.accessToken);
        } else {
            setUserInfo(user);
            if (user) {
                navigation.navigate('QUIZAPP');
            }
        }

        /*console.warn("AsyncStorage User  = " + user);
        if (!user) {
            getUserInfo(response.authentication.accessToken);
        } else {
            setUserInfo(user);
        }*/
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
            //console.warn(user);
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            navigation.navigate('QUIZAPP');
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    const handleManualSignup = async () => {

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        const user = { email, username, password };
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
        navigation.navigate('QUIZAPP');
    };

    return (
        <View style={styles.container}>
            {!userInfo ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <View style={{ flexDirection: 'row', }} >
                        <Text style={{ color: '#000000', fontSize: 14, marginRight: 3 }}>
                            if you are registered
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                            <Text style={{ color: '#FFA500', fontSize: 14, }} >
                                login
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleManualSignup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
                        <Image
                            source={require('../assets/google.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Sign Up with Google</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View>
                    <Text> Email: {userInfo.email}</Text>
                    <Text> Full name: {userInfo.username}</Text>

                    <Button
                        title="Remove AsyncStorage Value"
                        onPress={async () => {
                            await AsyncStorage.removeItem("@user");
                            setUserInfo(null);
                        }}
                    />

                </View>
            )}
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
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        width: '80%',
        backgroundColor: "transparent", // Butonun içi boş olacak
        borderRadius: 10,
        borderColor: "#FFA500", // Turuncu renk
    },
    quizButtonText: {
        color: "black",
        textAlign: "center",
    },
    button: {
        marginTop: 15,
        flexDirection: 'row', // Simge ve metni yatay olarak hizalar
        alignItems: 'center', // Dikey olarak ortalar
        backgroundColor: '#FFA500', // Butonun arka plan rengini ayarlar
        padding: 8,
        borderRadius: 5,
    },
    icon: {
        width: 20, // Simgenin genişliği
        height: 20, // Simgenin yüksekliği
        marginRight: 10, // Metin ile simge arasındaki boşluk
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default login;