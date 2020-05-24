import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { Button, Text } from 'react-native-elements';

const DraftQuestions = ({history, location}) => {
    const refContainer = useRef(null);

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
        <View style={styles.view}>
            <Text styles={{textAlign: 'center'}}>Add your personalized questions here!</Text>
            { location.state.questions ?  (

            <View style={styles.questions}>
                <FlatList 
                    ItemSeparatorComponent={() => {
                        return (
                          //Item Separator
                          <View style={{height: 2, width: '100%', backgroundColor: 'lightyellow'}}/>
                        );}}
                    ref={refContainer}
                    onContentSizeChange={()=>{   
                        if(refContainer.current){
                            refContainer.current.scrollToEnd();
                        }}}
                    data={location.state.questions}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            onPress={() => {
                                return history.push('/components/DraftQuestion', {
                                    gameLink: location.state.gameLink,
                                    questions: location.state.questions,
                                    name: location.state.name, 
                                    isHost: location.state.isHost,
                                    round: location.state.round,
                                    questionIndex: index
                                })
                            }
                        }>
                            <Text
                                styles={styles.question} >
                                    <Text styles={styles.questionNumber}>Question {item.questionIndex + 1}. </Text>
                                    {item.prompt.length > 15 ? 
                                        <Text>{item.prompt.slice(0, 15)}...</Text> : 
                                        <Text>{item.prompt}</Text>}
                            </Text>
                        </TouchableOpacity>)}
                    keyExtractor={(item) => item.questionIndex}
                    style={styles.flatList}
                />
            </View> 
            ) : null
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
                title="Submit questions"
                onPress={() => {
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
    view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    questions: {
        marginTop: 40,
        marginBottom: 40,
        padding: 20,
        borderColor: 'lightyellow',
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 30,
        width: 350,
    },
    flatList: {
        flexGrow: 0
    },
    question: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DraftQuestions;