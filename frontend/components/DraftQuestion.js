import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList} from 'react-native';

const DraftQuestion= ({history, location}) => {

    const [questions, setQuestions] = useState(location.state.questions);
    const [prompt, setPrompt] = useState(null);
    const [option, setOption] = useState(null);
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

    return (
        <View>
            <Text>In the making of a new question!</Text>

            <Text>Your prompt</Text>
            <TextInput 
                placeholder="prompt" 
                value={prompt} 
                onChangeText={(prompt) => setPrompt(prompt)}
            />
            <Button title='Save Prompt' 
                onPress={() => verifyString(prompt) && setPrompt(prompt)} />

            <Text>Your options: </Text>

            <FlatList 
                data={options}
                extraData={options}
                renderItem={({item}) => <Text> {item.option} </Text>}
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
                    }
                }
            } />

            <Button title="Save and go back" 
                onPress={() => {
                    setQuestions([...questions, {questionIndex: questions.length, prompt, options}]).then(
                        history.push('/components/DraftQuestions', {questions}))
                    }
                }/>
            {console.log("supposed to print the questions here")}
            {console.log(questions)}
        </View>
    )
};

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0
    }
});

export default DraftQuestion;