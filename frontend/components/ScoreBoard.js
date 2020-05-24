import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, FlatList, ActivityIndicator} from 'react-native';
import { Button, Text } from 'react-native-elements';
import Emoji from 'react-native-emoji';

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
        <View style={styles.view}>
            <Text style={styles.scoreBoard}>Score Board</Text>
            <Text style={styles.totalQuestions}>Out of {location.state.questions.length} questions</Text>
            {ranking ? 
                (<FlatList 
                    style={styles.flatList}
                    data={ranking}
                    renderItem={({item, index}) => (
                          <View style={styles.rank}>
                            {index == 0 ? <Emoji name="first_place_medal" style={{textAlign: 'left', fontSize: 30}} /> : null}
                            {index == 1 ? <Emoji name="second_place_medal" style={{textAlign: 'left', fontSize: 30}} /> : null}
                            {index == 2 ? <Emoji name="third_place_medal" style={{textAlign: 'left', fontSize: 30}} /> : null}
                            {index > 2 ? <View style={styles.place}>
                                <Text>{index + 1}</Text>
                            </View> : null}
                            
                            <Text>{item.name}</Text> 
                            <Text style={styles.point}>{item.points}</Text>
                        </View>
                        )}
                        >
                </FlatList>
                ) : <ActivityIndicator />
            }

            <Button 
                title="Play again with the same players" 
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
                title="Return home" 
                onPress={() => history.push('/')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreBoard: {
        fontFamily: "ChelseaMarket-Regular",
        fontSize: 40,
        textAlign: 'center',
    },
    totalQuestions: {
        color: 'grey'
    },
    flatList: {
        flexGrow: 0,
        marginBottom: 20
    },
    rank: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderColor: 'lightyellow',
        borderStyle: 'solid',
        margin: 3,
        borderWidth: 2,
        padding: 5,
        width: 300,
    },
    place: {
        borderRadius: 20,
        width: 40,
        height: 40,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    point: {
        marginRight: 10
    }


});

export default ScoreBoard;