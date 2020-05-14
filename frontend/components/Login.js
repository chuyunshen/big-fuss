import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Hyperlink from 'react-native-hyperlink';

const Login = ({}) => {
    return (
        <View style={styles.loginView}>
            <Hyperlink
                linkStyle={ { color: '#2980b9', fontSize: 20 } }
                linkText={ url => url === '/oauth2/authorization/github' ? 'Click here' : url }
            >
                <Text style={ { fontSize: 15 } }>
                    Login with Github: /oauth2/authorization/github
                </Text>
            </Hyperlink>

            <Hyperlink
                linkStyle={ { color: '#2980b9', fontSize: 20 } }
                linkText={ url => url === '/oauth2/authorization/google' ? 'Click here' : url }
            >
                <Text style={ { fontSize: 15 } }>
                    Login with Github: /oauth2/authorization/google
                </Text>
            </Hyperlink>
        </View>
    )
};

const styles = StyleSheet.create({
    loginView: {alignItems: "center", justifyContent: "center"},
});

export default Login;