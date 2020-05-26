import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { ThemeProvider} from 'react-native-elements';
import { theme } from './components/Theme';
import { NativeRouter, Switch, Route} from "react-router-native";
import NewGame from "./components/NewGame";
import JoinGame from "./components/JoinGame";
import Home from "./components/Home";
import Room from "./components/Room";
import DraftQuestions from "./components/DraftQuestions";
import DraftQuestion from "./components/DraftQuestion";
import ReadyRoom from './components/ReadyRoom';
import Questions from './components/Questions';
import ScoreBoard from './components/ScoreBoard';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const App = () => {

    return (
        <NativeRouter>
            <ThemeProvider theme={theme} >
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
            </ThemeProvider>
        </NativeRouter>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: '#F5ECE1'
    }
});

export default App;