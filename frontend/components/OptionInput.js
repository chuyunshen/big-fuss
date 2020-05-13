import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const OptionInput = ({}) => {
    return (
        <View style={styles.optionInput}>
            <TextInput placeholder="Add Option" style={styles.input} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    <Icon name="plus" size={20}/>>
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    optionInput: {height: 60, backgroundColor: "blue", alignItems: "center", justifyContent: "center"},
    button: {
        backgroundColor: 'lightblue',
    },
    input: {fontSize: 25, color: "white"}
});

export default OptionInput;
