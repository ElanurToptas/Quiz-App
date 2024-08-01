import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Pressable } from 'react-native';
import questions from "../data/questions";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

function QuizScreen() {
  const navigation = useNavigation();

  const data = questions;
  const totalQuestions = data.length;
  //points
  const [points, setPoints] = useState(0);

  //index of the questions
  const [index, SetIndex] = useState(0);

  // answer Status (true or false)
  const [answerStatus, setAnswerStatus] = useState(null);

  // answer 
  const [answer, setAnswers] = useState([]);

  // selected answer
  const [selectedAnswerIndex, setSelecetedAnswerIndex] = useState(null);

  //Counter
  const [counter, setCounter] = useState(15);

  //interval
  let interval = null;

  // progress bar
  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answer.push({ question: index + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answer.push({ question: index + 1, answer: false });
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelecetedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        SetIndex(index + 1);
        setCounter(15);
      }
    };
    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (index + 1 > data.length) {
      clearTimeout(interval)
      navigation.navigate("Results", {
        answers: answer,
        points: points,
      });
    }
  }, [index]);


  useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);


  const currentQuestion = data[index];
  console.log(answerStatus)

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, marginTop: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Quiz Challenge</Text>
        <Pressable style={{
          padding: 10,
          backgroundColor: "#FFA500",
          borderRadius: 10,
        }}>
          <Text style={{
            color: "White", textAlign: "center", fontWeight: "bold"
          }}>{counter}</Text>
        </Pressable>
      </View>

      <View style={{
        flexDirection: "row",
        alignItems: "center", // dikey eksen boyunca öğelerin nasıl hizalanacağını belirler: merkez
        justifyContent: "space-between", // yatay eksen boyunca öğelerin nasıl hizalanacağını belirler : eşit aralıklarla
        padding: 10
      }}>
        <Text style={{ fontWeight: "bold" }}>Your Progress</Text>
        <Text style={{ fontWeight: "bold" }}>({index}/{totalQuestions}) questions answered</Text>
      </View>

      {/*Progress Bar 22.07 */}

      {/* Sorular için akış çubuğu */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: 10,
          borderRadius: 20,
          justifyContent: "center",
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            backgroundColor: "#FFA500",
            borderRadius: 12,
            left: 0,
            right: 0,
            position: "absolute",
            height: 10,
            width: `${progressPercentage}%`,
            marginTop: 20,
          }}
        />
      </View>

      {/* Sorular için akış çubuğu */}

      <View
        style={{
          marginTop: 30,
          padding: 10,
        }} >
        <Text style={{ fontSize: 18, fontWeight: "bold", }}>{currentQuestion?.question} </Text>
        <View style={{ marginTop: 12, }}>
          {currentQuestion?.options.map((item, index) => (
            <Pressable
              onPress={() => selectedAnswerIndex === null && setSelecetedAnswerIndex(index)}
              style={
                selectedAnswerIndex === index && index === currentQuestion.correctAnswerIndex
                  ? {
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#FFA500",
                    marginVertical: 12,
                    backgroundColor: 'green',
                    borderRadius: 20,
                  }
                  : selectedAnswerIndex !== null &&
                    selectedAnswerIndex === index
                    ? {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#FFA500",
                      backgroundColor: 'red',
                      marginVertical: 12,
                      borderRadius: 20,
                    }
                    : {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#FFA500",
                      marginVertical: 12,
                      borderRadius: 20,
                    }
              }>
              {selectedAnswerIndex === index && index === currentQuestion?.correctAnswerIndex ? (
                <AntDesign style={{
                  backgroundColor: "transparent", // Butonun içi boş olacak
                  textAlign: "center",
                  padding: 8,
                  borderRadius: 20,
                  borderColor: "#FFA500", // Turuncu renk
                  borderWidth: 0.5, // Çizginin kalınlığı
                }} name="checkcircle"
                  size={15}
                  color="black" />
              ) : selectedAnswerIndex !== null &&
                selectedAnswerIndex === index
                ? (
                  <AntDesign style={{
                    backgroundColor: "transparent", // Butonun içi boş olacak
                    textAlign: "center",
                    padding: 8,
                    borderRadius: 20,
                    borderColor: "#FFA500", // Turuncu renk
                    borderWidth: 0.5, // Çizginin kalınlığı
                  }} name="closecircle"
                    size={15}
                    color="black" />) :
                (
                  <Text style={{
                    backgroundColor: "transparent", // Butonun içi boş olacak
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 20,
                    borderColor: "#FFA500", // Turuncu renk
                    borderWidth: 0.5, // Çizginin kalınlığı
                  }}>{item.options}</Text>
                )}
              <Text style={{ marginLeft: 10 }}>{item.answer}</Text>
            </Pressable>
          )
          )}
        </View>
      </View>

      <View style={
        answerStatus === null
          ? null
          : {
            marginTop: 45,
            padding: 10,
            borderRadius: 7,
            height: 120,
          }
      }>
        {answerStatus === null ? null : (
          <Text
            style={
              answerStatus == null
                ? null
                : { fontSize: 17, textAlign: "center", fontWeight: "bold" }
            }
          >
            {!!answerStatus ? "Correct Answer" : "Wrong Answer"}
          </Text>
        )}

        {index + 1 >= questions.length ? (
          <Pressable
            onPress={() =>
              navigation.navigate("Results", {
                points: points,

                answers: answer,
              })
            }
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable
            onPress={() => SetIndex(index + 1)}
            style={{
              backgroundColor: answerStatus ? "green" : "red",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
              borderColor: "#FFA500", // Turuncu renk
              borderWidth: 0.5, // Çizginin kalınlığı
            }}
          >
            <Text style={{ color: "black" }}>Next Question</Text>
          </Pressable>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default QuizScreen;
