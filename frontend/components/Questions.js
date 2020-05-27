import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import {retrievePlayers, retrieveQuestions} from "../service/QuestionService";
import Question from "./Question";

const Questions = ({history, location}) => {

    const [questions, setQuestions] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [playerAnswers, setPlayerAnswers] = useState([]);

    const getQuestions = () => {
        fetch(`${location.state.gameLink}/questions`)
            .then((response) => response.json())
            .then((response) => {
                // get the latest set of questions
                console.log(response);
                console.log(Object.keys(response).length);
                setQuestions(response[Object.keys(response).length - 1]);
            } )
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getQuestions();
    console.log(questions);
    }, []);

    // Take to score board
    useEffect(() => {
        if (questions && questionIndex == questions.length) {
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
            {questions && questionIndex < questions.length ? (
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
