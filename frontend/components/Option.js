import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Option = ({ item, selectAnswer }) => {
    return (
        <TouchableOpacity style={styles.option}>
            <View
                style={styles.optionView}
                onPress={() => selectAnswer(item.id)}>
                <Text style={styles.optionText}>
                    { item.text }
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    option: {
        marginTop:15,
        padding: 15,
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center"},
    optionView: {},
    optionText: {
        fontSize: 20,
        color: "white"}
});

export default Option;
