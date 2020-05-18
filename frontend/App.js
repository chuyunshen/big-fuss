import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Image} from 'react-native';
import NewGame from "./components/NewGame";
import { NativeRouter, Switch, Route} from "react-router-native";
import JoinGame from "./components/JoinGame";
import Home from "./components/Home";
import Room from "./components/Room";
import DraftQuestions from "./components/DraftQuestions";
import DraftQuestion from "./components/DraftQuestion";
import ReadyRoom from './components/ReadyRoom';
import Questions from './components/Questions';
import ScoreBoard from './components/ScoreBoard';
// import { getCurrentUser } from './components/APIUtils';
// import SocialLogin from "./components/SocialLogin";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import {ACCESS_TOKEN} from "./components/URLs";
// import { AsyncStorage } from "react-native";

const App = () => {

    return (
        <NativeRouter>
            <View style={styles.container}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/components/NewGame" component={NewGame} />
                    <Route exact path="/components/JoinGame" component={JoinGame} />
                    <Route exact path="/components/Room" component={Room} />
                    <Route exact path="/components/DraftQuestions" component={DraftQuestions} />
                    <Route exact path="/components/DraftQuestion" component={DraftQuestion} />
                    <Route exact path="/components/ReadyRoom" component={ReadyRoom} />
                    <Route exact path="/components/Questions" component={Questions} />
                    <Route exact path="/components/ScoreBoard" component={ScoreBoard} />
                </Switch>
            </View>
        </NativeRouter>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
});

// <View style={styles.socialLogin}>
//    <SocialLogin/>
// </View>


// <NativeRouter>
//     <View style={styles.container}>
//         <View>
//             <Text>Welcome</Text>
//         </View>
//         <View style={styles.login}>
//             <Link to="/signup" underlayColor="#f0f4f7" style={styles.navItem}>
//                 <Text>Sign Up</Text>
//             </Link>
//             <Link to="/login" underlayColor="#f0f4f7" style={styles.navItem}>
//                 <Text>Log In</Text>
//             </Link>
//         </View>
//         <Route path="/signup" component={SignUp} />
//         <Route path="/login" component={Login} />
//     </View>
// </NativeRouter>
export default App;
