import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import {retrievePlayers, retrieveQuestions} from "../service/QuestionService";
import Question from "./Question";


const Questions = ({history, location}) => {

    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [numberOfQuestions, setNumbersOfQuestions] = useState(null);

    const submitAnswer = () => {
        setQuestionIndex(questionIndex + 1);
    };

    const incrementPoints = () => {

    }
    console.log(`${location.state.gameLink}/questions`);

    const getQuestions = () => {
        fetch(`${location.state.gameLink}/questions`)
            .then((response) => response.json())
            .then((response) => {
                setQuestions(response);
                console.log(response)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <View>
            {isLoading ? <ActivityIndicator/> : (
                <View>
                    <Question 
                        questionItem={questions[questionIndex]} 
                        questionNumber={questionIndex + 1} 
                        onPress={submitAnswer}/>
                </View>)}
        </View>
    );
};

export default Questions;
