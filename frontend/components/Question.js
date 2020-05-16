import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image} from 'react-native';
import Prompt from "./Prompt";
import Option from "./Option";
import QuestionMaster from "./QuestionMaster";
import QuestionNumber from "./QuestionNumber";

const Question = (props) => {

    const selectPlayerAnswer = (id) => {
        submitAnswer(id);
    };

    return (
        <View>
            <QuestionNumber number={props.questionNumber}/>
            <QuestionMaster name={props.questionItem.playerName}/>
            <Prompt item={props.questionItem.prompt} />
            {
                props.questionItem.options.map(
                    option => <Option
                        item={option}
                        selectPlayerAnswer={() => selectPlayerAnswer(id)} />)
            }
            <Button title="Submit Answer"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, paddingTop: 60},
});

export default Question;
//             <FlatList
//                 data={options}
//                 renderItem={({ props.questionItem }) => <Option item={options} selectPlayerAnswer={selectPlayerAnswer} /> }
//             />
