import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, CheckBox, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const DraftQuestion = ({history, location}) => {

    const [prompt, setPrompt] = useState('');
    const [option, setOption] = useState('');
    const [options, setOptions] = useState([]);
    const [optionIndex, setOptionIndex] = useState(0);
    const [pressedIndices, setPressedIndices] = useState([]);
    const refContainer = useRef(null);

    const verifyString = (string, type) => {
        if ((!string) || (string.trim() === '')) {
            alert(`${type} cannot be blank`)
            return false;
        } else {
            return true;
        }
    }

    const verifyOptions = (options) => {
        if (options.length) {
            return true;
        } else {
            alert("You haven't entered any options")
        }
    }

    const verifyCorrectAnswers = (correctAnswers) => {
        if (correctAnswers.length) {
            return true;
        } else {
            alert("Please select your correct answer(s)")
        }
    }

    useEffect(() => {
        if ("questionIndex" in location.state) {
            setPrompt(location.state.questions[location.state.questionIndex].prompt);
            setOptions(location.state.questions[location.state.questionIndex].options);
            setPressedIndices(location.state.questions[location.state.questionIndex].pressedIndices);
        }
    }, [])

    return (
        <View style={ styles.view }>
            <Text>In the making of a new question!</Text>
            <Text>Add a question:</Text>
            <Input 
                placeholder="prompt" 
                value={ prompt } 
                onChangeText={(prompt) => setPrompt(prompt)}
            />

            <Text>Add options and select the correct one(s): </Text>

            <FlatList 
                ref={refContainer}
                onContentSizeChange={()=>{   
                    if(refContainer.current){
                        refContainer.current.scrollToEnd();
                    }}}
                keyboardShouldPersistTaps='handled'
                data={options}
                extraData={options}
                renderItem={({item, index}) => (
                    <View style={styles.option}>
                        <Text style={{margin: 0}}>
                            {(item.optionIndex + 10).toString(36).toUpperCase()}. {item.option}
                        </Text>
                        <CheckBox
                            checked={pressedIndices[index]} 
                            onPress={() => {
                                setPressedIndices([...pressedIndices.slice(0, index), 
                                    !pressedIndices[index], 
                                    ...pressedIndices.slice(index + 1)]);}
                            } />
                    </View> 
                    )
                }
                keyExtractor={(item) => item.optionIndex}
                style={styles.flatList}
            />

            <Input 
                placeholder="Enter an option here" 
                value={option} 
                onChangeText={(option) => setOption(option)}
            />
            <Button 
                title='Add option' 
                onPress={() => {
                    if (verifyString(option, "Option")) {
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
                    if (verifyString(prompt, "Prompt") && verifyOptions(options) && verifyCorrectAnswers(correctAnswers)) {

                        let questionsToAppend = {};
                        // if is editting an existing question
                        if ("questionIndex" in location.state) {
                            location.state.questions[location.state.questionIndex] = {
                                    questionIndex: 
                                        (location.state.questionIndex), 
                                    prompt, 
                                    options, 
                                    correctAnswers,
                                    pressedIndices}
                            questionsToAppend = location.state.questions;
                        } else {
                        // if it's a new question
                            questionsToAppend = [...(location.state.questions || []), 
                                {questionIndex: 
                                    (location.state.questions ? location.state.questions.length : 0), 
                                    prompt, 
                                    options, 
                                    correctAnswers,
                                    pressedIndices}];
                        }
                        history.push('/components/DraftQuestions', {
                            questions: questionsToAppend, 
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
    view: {
        maxHeight: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList: {
        margin: 0,
        flexGrow: 0
    }, 
    option: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default DraftQuestion;