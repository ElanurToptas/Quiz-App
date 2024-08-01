import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Flutter Quiz!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;