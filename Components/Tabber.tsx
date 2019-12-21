import {Animated, Text, SafeAreaView, StyleSheet, TouchableOpacity, View, Easing} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface TabberState {
    animation: Animated.Value
    animatedWobbleValue: Animated.Value
}

const icons = [
    'beats',
    'bomb',
    'alien',
    'apple',
    'bell'
]

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Tabber extends React.Component {
    state = {
        animation: new Animated.Value(0),
        ballAnimation: new Animated.Value(0),
        opacity: false,
        index: 0
    };

    render() {
        const iconAStyles = {
            color: 'rgb(122,19,255)',
            transform: [{
                rotate: this.state.animation.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-0.25rad', '0.25rad']
                })
            }]
        };

        const ballInterpolation = this.state.ballAnimation.interpolate({
            inputRange: [0, 1, 2, 3, 4],
            outputRange: [25, 85, 140, 200, 260],
        });

        const ballStyle = {
            opacity: this.state.opacity,
            transform: [
                {translateX: ballInterpolation}
            ]
        };

        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.pickerBar}>
                        {
                            icons.map((item, index) => {
                                return index === this.state.index ?
                                    <AnimatedIcon key={item} name={item} style={iconAStyles} size={40}/> :
                                    <Icon key={item} name={item} color={'rgb(180,180,180)'} size={40}/>
                            })
                        }
                    </View>
                    <View style={styles.track}>
                        <Animated.View style={[styles.ball, ballStyle]}/>
                    </View>
                </View>
                <TouchableOpacity onPress={this.startWobble}>
                    <Text>StartAnimation</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    startWobble = () => {
        let lastItem = this.state.index < (icons.length - 1);
        if (lastItem) {
            this.setState({index: ++this.state.index});
        } else {
            this.setState({index: 0});
        }
        this.setState({opacity: true})
        Animated.timing(this.state.ballAnimation, {
            toValue: lastItem ? this.state.index : 0,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true
        }).start( () =>  this.setState({opacity: false}))

        Animated.sequence([
            Animated.timing(this.state.animation, {
                toValue: 1.0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(this.state.animation, {
                toValue: -1.0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(this.state.animation, {
                toValue: 0.0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ]).start();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(122,19,255)'
    },
    pickerBar: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        width: 300,
        backgroundColor: 'rgb(222,222,222)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 50
    },
    track: {
        borderRadius: 30,
        width: 300,
        top: -50
    },
    ball: {
        width: 20,
        height: 20,
        backgroundColor: 'rgb(122,19,255)',
        borderRadius: 30
    }
});
export default Tabber
