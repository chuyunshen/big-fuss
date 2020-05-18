import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import {retrievePlayers, retrieveQuestions} from "../service/QuestionService";
import Question from "./Question";


const Questions = ({history, location}) => {

    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [playerAnswers, setPlayerAnswers] = useState([]);

    const submitAnswer = () => {
        setQuestionIndex(questionIndex + 1);
    };

    // checks answer for a single question
    const checkAnswers = (questionIndex) => {
        if (questions[questionIndex].correctAnswers.sort() == playerAnswers[questionIndex].sort()) {
            return true;
        } else {
            return false;
        }
    }

    const getQuestions = () => {
        fetch(`${location.state.gameLink}/questions`)
            .then((response) => response.json())
            .then((response) => {
                setQuestions(response);
                console.log(response)
            } )
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getQuestions();
    }, []);

    // Take to score board
    useEffect(() => {
        if (!isLoading && questionIndex == questions.length) {
            history.push('/components/ScoreBoard', {
                gameLink: location.state.gameLink,
                name: location.state.name,
                questions,
                playerAnswers
            });
        }
    
    });

    return (
        <View>
            {!isLoading && questionIndex < questions.length ? (
                <View>
                    <Question 
                        questionItem={questions[questionIndex]} 
                        questionNumber={questionIndex + 1} 
                        appendAnswers={
                            (newAnswers) => setPlayerAnswers([...playerAnswers, newAnswers])}
                        updateQuestionIndex={() => {setQuestionIndex(questionIndex + 1)}}
                        checkAnswers={checkAnswers}
                            />
                </View>) : <ActivityIndicator/> }
        </View>
    );
};

StyleSheet.create({
    scoreBoard: {}
})

export default Questions;
