import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { Button } from 'react-native-elements';

const DraftQuestions = ({history, location}) => {
    const [readyButtonColor, setReadyButtonColor] = useState('lightblue');

    const verifyQuestions = (questions) => {
        if (!questions) {
            alert("You haven't added any questions.");
            return false
        } else {
            return true;
        }
    }

    //TODO: clear ready status
    //TODO: clear points set to null

    return (
        <View>
            <Text>You can add your personalized questions here!</Text>
            { location.state.questions ?  (
            <FlatList 
                data={location.state.questions}
                renderItem={({item}) => (
                    <TouchableOpacity>
                        <Text>{item.questionIndex + 1}. {item.prompt}</Text>
                    </TouchableOpacity>)}
                keyExtractor={(item) => item.questionIndex}
                style={styles.flatList}
            />) : <Text>There is no question yet</Text>
            }

            <Button 
                title="Add a new question" 
                onPress={() => history.push('/components/DraftQuestion', {
                    gameLink: location.state.gameLink,
                    questions: location.state.questions,
                    name: location.state.name, 
                    isHost: location.state.isHost,
                    round: location.state.round
                })}
            />

            <Button
                style={styles.readyButtonPressed}
                title="I'm ready"
                onPress={() => {
                    setReadyButtonColor('lightpink');
                    verifyQuestions(location.state.questions) && history.push(
                        '/components/ReadyRoom', {
                            gameLink: location.state.gameLink, 
                            name: location.state.name, 
                            isHost: location.state.isHost,
                            questions: location.state.questions,
                            round: location.state.round
                        });
                    
                }}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0
    },
    readyButtonPressed: {
        color: "lightblue"
    }
});

export default DraftQuestions;