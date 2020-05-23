import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

export const theme = {
    Button: {
        containerStyle: [
            {
                margin: 10
            }],
        titleStyle: {
            color: 'black',
            fontFamily: "NotoSerif",
            marginLeft: 10,
            marginRight: 10,
        },
        buttonStyle: {
            borderRadius: 20,
            backgroundColor: "#FDD443" 
        }
    },

    CheckBox: {
        right: true,
        checkedColor: '#8c9c77'
    },

    Text: {
        style: {
            fontSize: 18,
            margin: 10,
            fontFamily: "NotoSerif"
        }
    }
  };

// fontFamily: "ChelseaMarket-Regular"

const CustomText = ({ item }) => {
    return (
        <Text style={styles.text}>
            {item}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    }
})

export default CustomText;