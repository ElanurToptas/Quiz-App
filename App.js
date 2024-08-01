import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ReactQuizScreen from './screen/ReactQuizScreen';
import FlutterQuizScreen from './screen/FlutterQuizScreen';
import KotlinQuizScreen from './screen/KotlinQuizScreen';
import SwiftQuizScreen from './screen/SwiftQuizScreen';
import ResultScreen from './screen/ResultScreen';
import login from './screen/login';
import signup from './screen/signup'
import welcome from './screen/welcome'

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={signup} options={{ headerShown: false }} />
        <Stack.Screen name="welcome" component={welcome} options={{ headerShown: false }} />
        <Stack.Screen name="QUIZAPP" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="React" component={ReactQuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Flutter" component={FlutterQuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Kotlin" component={KotlinQuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Swift" component={SwiftQuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Results" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;