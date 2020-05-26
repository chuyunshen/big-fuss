import React from 'react';
import { Text, StyleSheet } from 'react-native';
 
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
            backgroundColor: "#D0E4D1" 
        }
    },

    CheckBox: {
        right: true,
        checkedColor: '#8c9c77',
        margin: 0
    },

    Text: {
        style: {
            fontSize: 18,
            margin: 10,
            fontFamily: "NotoSerif",
        }
    },

    Input: {
        containerStyle: [
            {
                margin: 10,
                width: 300,
                paddingHorizontal: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }],
        inputStyle: {
            width: '100%',
            textAlign: 'center',
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