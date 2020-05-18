import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity} from 'react-native';

//TODO: add correct answer by highliting

const DraftQuestion= ({history, location}) => {

    const [prompt, setPrompt] = useState('');
    const [option, setOption] = useState('');
    const [options, setOptions] = useState([]);
    const [optionIndex, setOptionIndex] = useState(0);
    const [pressedIndices, setPressedIndices] = useState([]);

    const verifyString = (string) => {
        if ((!string) || (string.trim() === '')) {
            alert("Field cannot be blank")
            return false;
        } else {
            return true;
        }
    }

    const verifyOptions = (options) => {
        if (options.length > 0) {
            return true;
        } else {
            alert("You haven't entered any options")
        }
    }

    const verifyCorrectAnswers = (correctAnswers) => {
        if (correctAnswers.length > 0) {
            return true;
        } else {
            alert("Please select your correct answer(s)")
        }
    }

    return (
        <View>
            <Text>In the making of a new question!</Text>

            <Text>Your prompt</Text>
            <TextInput 
                placeholder="prompt" 
                value={prompt} 
                onChangeText={(prompt) => setPrompt(prompt)}
            />

            <Text>Your options: </Text>

            <FlatList 
                data={options}
                extraData={options}
                renderItem={({item, index}) => (
                    <View style={styles.option}>
                        <Text>
                            {(item.optionIndex + 10).toString(36).toUpperCase()}. {item.option}
                        </Text>
                        <TouchableOpacity 
                            style={styles.correct, {backgroundColor: (pressedIndices[index] ? "honeydew" : "white")}}
                            onPress={() => {
                                setPressedIndices([...pressedIndices.slice(0, index), 
                                    !pressedIndices[index], 
                                    ...pressedIndices.slice(index + 1)]);}
                            }>
                            <Text>correct</Text>
                        </TouchableOpacity>
                    </View> 
                    )
                }
                keyExtractor={(item) => item.optionIndex}
                style={styles.flatList}
            />

            <TextInput 
                placeholder="Enter an option here" 
                value={option} 
                onChangeText={(option) => setOption(option)}
            />
            <Button 
                title='Add option' 
                onPress={() => {
                    if (verifyString(option)) {
                        setOptions([...options, {optionIndex, option}]);
                        setPressedIndices([...pressedIndices, false]);
                        setOptionIndex(optionIndex + 1);
                        setOption(null);
                    }
                }
            } />

            <Button title="Save and go back" 
                onPress={() => {
                    let correctAnswers = [];
                    for (let i=0; i < pressedIndices.length; i++) {
                        if (pressedIndices[i]) {
                            correctAnswers.push(i);
                        }
                    }
                    if (verifyString(prompt) && verifyOptions(options) && verifyCorrectAnswers(correctAnswers)) {
                    history.push('/components/DraftQuestions', 
                        {questions: 
                            [...(location.state.questions || []), 
                                {questionIndex: 
                                    (location.state.questions ? location.state.questions.length : 0), 
                                    prompt, options, correctAnswers}],
                        name: location.state.name,
                        isHost: location.state.isHost,
                        gameLink: location.state.gameLink,
                        round: location.state.round
                        });
                    }}}
                />
            <Button title="Go back without saving" 
                onPress={() => {
                    history.push('/components/DraftQuestions', 
                        {questions: location.state.questions,
                        gameLink: location.state.gameLink,
                        name: location.state.name,
                        isHost: location.state.isHost,
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
    option: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    correct: {
        marginLeft: 1,
    }
});

export default DraftQuestion;