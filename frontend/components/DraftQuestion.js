import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList} from 'react-native';

const DraftQuestion= ({history, location}) => {

    const [prompt, setPrompt] = useState('');
    const [option, setOption] = useState('');
    const [options, setOptions] = useState([]);
    const [optionIndex, setOptionIndex] = useState(0);

    const verifyString = (string) => {
        if (string.trim() === '') {
            alert("Field cannot be blank")
            return false;
        } else {
            return true;
        }
    }

    const verifyOptions = (options ) => {
        if (options.length > 0) {
            return true;
        } else {
            alert("You haven't entered any options")
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
                renderItem={({item}) => <Text>{(item.optionIndex + 10).toString(36).toUpperCase()}. {item.option}</Text>}
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
                        setOptionIndex(optionIndex + 1);
                        setOption(null);
                    }
                }
            } />

            <Button title="Save and go back" 
                onPress={() => {
                    if (verifyString(prompt) && verifyOptions) {
                    history.push('/components/DraftQuestions', 
                        {questions: 
                            [...(location.state.questions || []), 
                                {questionIndex: 
                                    (location.state.questions ? location.state.questions.length : 0), 
                                    prompt, options}],
                        name: location.state.name,
                        isHost: location.state.isHost,
                        gameLink: location.state.gameLink,
                                });
                    }}}
                />
            <Button title="Go back without saving" 
                onPress={() => {
                    history.push('/components/DraftQuestions', 
                        {questions: location.state.questions,
                        gameLink: location.state.gameLink,
                        name: location.state.name,
                        isHost: location.state.isHost
                        });
                    }}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0
    }
});

export default DraftQuestion;