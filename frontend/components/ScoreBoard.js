import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, ActivityIndicator} from 'react-native';

//TODO: add correct answer by highliting

const ScoreBoard = ({history, location}) => {

    const [points, setPoints] = useState(null);

    const checkAnswersAndIncrementPoints = () => {
        let count = 0;
        console.log("questions");
        console.log(location.state.questions);
        console.log("player answers");
        console.log(location.state.playerAnswers);
        for (let i=0; i < location.state.questions.length; i++) {
            console.log("correct");
            console.log(location.state.questions[i].correctAnswers.sort());
            console.log("player");
            console.log(location.state.playerAnwers[i]);
            if (location.state.questions[i].correctAnswers.sort() === 
                location.state.playerAnswers[i].sort()) {
                    console.log("incr");
                count++;
            }
        }
        setPoints(count);
    }

    useEffect(() => {
        checkAnswersAndIncrementPoints();
    }, [])
    
    return (
        <View>
            <Text>Score Board</Text>
            {points ? 
                (<Text>Your Points: {points}</Text>) :
                <ActivityIndicator />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0
    }
});

export default ScoreBoard;