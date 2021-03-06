/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import AnimatedTextInput from "./Components/AnimatedTextInput";
import {Dimensions, Text, StyleSheet, TouchableOpacity, View} from "react-native";
import Tabber from "./Components/Tabber";
import Spread from "./Components/spread";
import ParralaxModal from "./Components/parralaxModal";

const {width} = Dimensions.get('window');


const App = () => {
    const [navIndex, setNavIndex] = useState(0);
    const [menuState, setmenuState] = useState(true);

    function nav() {
        switch (navIndex) {
            case 0 :
                return <Tabber/>
            case 1:
                return <Spread/>
            case 2:
                return <ParralaxModal/>
            case 3:
                return <AnimatedTextInput width={width - 40} height={250}/>

            default:
                return <></>

        }
    }

    return (
        <View style={styles.navContainer}>
            {menuState &&
            <View style={styles.navBar}>
                <TouchableOpacity
                    onPress={() => setNavIndex(0)}
                    style={styles.navButton}>
                    <Text style={styles.navText}>ONE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setNavIndex(1)}
                    style={styles.navButton}>
                    <Text style={styles.navText}>TWO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setNavIndex(2)}
                    style={styles.navButton}>
                    <Text style={styles.navText}>THREE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setNavIndex(3)}
                    style={styles.navButton}>
                    <Text style={styles.navText}>FOUR</Text>
                </TouchableOpacity>
            </View>
            }
            {nav()}
        </View>
    )
};

const styles = StyleSheet.create({
    navContainer: {
        flex: 1,
        backgroundColor: 'rgb(231, 43, 89)'
    },
    navBar: {
        flexDirection: 'row',
        height: 60,
        marginTop: 40
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'rgb(64, 54, 102)',
    },
    navText: {
        color: 'white'
    }
});

export default App;
