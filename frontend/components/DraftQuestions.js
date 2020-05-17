import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList} from 'react-native';

const DraftQuestions = ({history, location}) => {
    const [prompt, setPrompt] = useState('');
    const [option, setOption] = useState('');
    const [options, setOptions] = useState([]);

    console.log(location.state.questions);

    return (
        <View>
            <Text>You can add your personalized questions here!</Text>
            <FlatList 
                data={location.state.questions}
                renderItem={(question) => <Text>{question.prompt}</Text>}
                keyExtractor={(question) => question.questionIndex}
                style={styles.flatList}
            />

            <Button 
                title="Add a new question" 
                onPress={() => history.push('/components/DraftQuestion', {questions: location.state.questions})}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0
    }
});

export default DraftQuestions;