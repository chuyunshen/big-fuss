import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Header from './components/Header.js';
import Option from './components/Option.js';
import Prompt from './components/Prompt.js';
import OptionInput from "./components/OptionInput";


const App = () => {
    const [options, setOptions] = useState([
        { id:  "A", text: "She tripped and landed her face on concrete floor" },
        { id:  "B", text: "Drinking from a bottle of Rosé" },
        { id:  "C", text: "Opening a can of beans with her teeth" },
        { id:  "D", text: "While making out" },
    ]);

    const [answer, setAnswer] = useState([ null ]);

    const selectAnswer = (id) => {
        setAnswer(id);
    };

    return (
        <View style={styles.container}>
           <Header title='Trivial'/>
           <Prompt item="How did Dena chip her front tooth?" />
           <FlatList
               data={options}
               renderItem={({ item }) => <Option item={item} selectAnswer={selectAnswer()} /> }
           />
           <OptionInput />
        </View>
    );
};

/*     <Text style={styles.text}>Helloooooooooo</Text>
    <Image source={{uri:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Edgar_Allan_Poe%2C_circa_1849%2C_restored%2C_squared_off.jpg/427px-Edgar_Allan_Poe%2C_circa_1849%2C_restored%2C_squared_off.jpg"}}
        style={styles.image} />
 */

const styles = StyleSheet.create({
    container: {flex: 1, paddingTop: 60},
});

export default App;
