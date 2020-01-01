/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import AnimatedTextInput from "./Components/AnimatedTextInput";
import {Dimensions} from "react-native";
import Tabber from "./Components/Tabber";

const {width} = Dimensions.get('window');

const App = () => {
    return (
        <>
            <Tabber/>
            <AnimatedTextInput width={width - 40} height={250}/>
        </>
    )
};


export default App;
