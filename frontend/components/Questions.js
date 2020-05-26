import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import {retrievePlayers, retrieveQuestions} from "../service/QuestionService";
import Question from "./Question";

const Questions = ({history, location}) => {

    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [playerAnswers, setPlayerAnswers] = useState([]);

    const getQuestions = () => {
        fetch(`${location.state.gameLink}/questions`)
            .then((response) => response.json())
            .then((response) => {
                // get the latest set of questions
                setQuestions(response[Object.keys(response).length - 1]);
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
                playerAnswers,
                isHost: location.state.isHost,
                round: location.state.round
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
                            (newAnswers) => {
                                setPlayerAnswers([...playerAnswers, {questionIndex, answers: newAnswers}])}
                            }
                        updateQuestionIndex={() => {setQuestionIndex(questionIndex + 1)}}
                            />
                </View>) : <ActivityIndicator/> }
        </View>
    );
};

StyleSheet.create({
    scoreBoard: {}
})

export default Questions;
