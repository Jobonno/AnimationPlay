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
    'cards-heart',
    'death-star',
    'brightness-7',
];

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
                    outputRange: ['-0.3rad', '0.3rad']
                })
            }]
        };

        const ballInterpolation = this.state.ballAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [35, 75],
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
            setTimeout(() => this.setState({index: ++this.state.index}), 50);
        } else {
            setTimeout(() => this.setState({index: 0}), 150);
        }
        this.setState({opacity: true})
        Animated.timing(this.state.ballAnimation, {
            toValue: lastItem ? this.state.index + 1 : 0,
            duration: 300,
            easing: Easing.elastic(.7),
            useNativeDriver: true
        }).start( () =>  this.setState({opacity: false}))

        Animated.sequence([
            Animated.delay(100),
            Animated.timing(this.state.animation, {
                toValue: 1.0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(this.state.animation, {
                toValue: -1.0,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(this.state.animation, {
                toValue: 0.0,
                duration: 250,
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
        paddingHorizontal: 25,
        // width: 300,
        backgroundColor: 'rgb(222,222,222)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 50
    },
    track: {
        borderRadius: 30,
        // width: 300,
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
