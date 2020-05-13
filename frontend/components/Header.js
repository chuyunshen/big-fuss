import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';


const Header = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {height: 60, backgroundColor: "blue", alignItems: "center", justifyContent: "center"},
    text: {fontSize: 25, color: "white"}
});

Header.defaultProps = {
    title: "Trivia"
};

export default Header;
