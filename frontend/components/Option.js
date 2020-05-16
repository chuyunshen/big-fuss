import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Option = ({ item, selectPlayerAnswer }) => {

    return (
        <TouchableOpacity>
            <View style={styles.view}
                onPress={() => selectPlayerAnswer(item.id)}>
                <Text style={styles.text}>
                    { item }
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    view: {margin: 20, backgroundColor: "lightgrey", alignItems: "center"},
    text: {
        fontSize: 30,
        color: "white"}
});

export default Option;
