import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';

//TODO: add correct answer by highliting

const ScoreBoard = ({history, location}) => {

    const [ranking, setRanking] = useState(null);

    const calculatePoints = () => {
        let count = 0;
        for (let i=0; i < location.state.questions.length; i++) {
            const correctAnswers = JSON.stringify(location.state.questions[i].correctAnswers.sort());
            const playerAnswers = JSON.stringify(location.state.playerAnswers[i].answers.sort());
            if (correctAnswers === playerAnswers) {
                count++;
            }
        }
        return count;
    }

    const sendPoints = (points) => {
        fetch(`${location.state.gameLink}/players`, {
            method: 'PUT',
            body: JSON.stringify({
                name: location.state.name,
                isReady: true,
                isHost: location.state.isHost,
                points
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
    }

    const comparePoints = (a, b) => {
        if ( a.points > b.points ){
          return -1;
        }
        if ( a.points < b.points ){
          return 1;
        }
        return 0;
      }
      
    const compareName = (a, b) => {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }

    const getRanking = () => {
        fetch(`${location.state.gameLink}/players`)
        .then(response => response.json())
        .then((players) => {
            players.sort(compareName);
            players.sort(comparePoints);
            setRanking(players);
        });
    }

    useEffect(() => { sendPoints(calculatePoints());}, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getRanking();
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <View>
            <Text>Score Board</Text>
            <Text>Out of {location.state.questions.length} questions</Text>
            {ranking ? 
                (<FlatList 
                    style={styles.flatList}
                    data={ranking}
                    renderItem={({item}) => <Text>{item.name} got {item.points} points </Text>}>
                </FlatList>
                ) : <ActivityIndicator />
            }

            <Button 
                title="Play Again with the same players" 
                onPress={() => {
                    history.push('/components/DraftQuestions', {
                        gameLink: location.state.gameLink,
                        name: location.state.name,
                        isHost: location.state.isHost,
                        round: location.state.round + 1,
                    })
                }}
            />
            <Button 
                title="Return Home" 
                onPress={() => history.push('/')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0
    }
});

export default ScoreBoard;