import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Üst kısmındaki resim */}
      <View style={styles.header}>
        <Image source={require('./assets/image.png')} style={styles.headerImage} />
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('React')}>
            <Image source={require('./assets/react.png')} style={styles.image} />
            <Text style={styles.buttonText}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Flutter')}>
            <Image source={require('./assets/flutter.png')} style={styles.image} />
            <Text style={styles.buttonText}>Flutter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Kotlin')}>
            <Image source={require('./assets/kotlin.png')} style={styles.image} />
            <Text style={styles.buttonText}>Kotlin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Swift')}>
            <Image source={require('./assets/swift.png')} style={styles.image} />
            <Text style={styles.buttonText}>Swift</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1 / 2, // Üst kısmı ekranın yarısı kadar yer kaplayacak
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40, // Butonlar ile resim arasına boşluk ekler
    paddingTop: 40,

  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // görselin boyutlarının orantılı olarak ölçeklendirilmesini sağlar.
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  buttonContainer: {
    flex: 2, // Alt kısmı ekranın üçte ikisi kadar yer kaplayacak
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    padding: 25,
    backgroundColor: '#FFA500',
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default HomeScreen;
