import {Animated, Text, SafeAreaView, StyleSheet, TouchableOpacity, View, Easing} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
        opacityAnimation: new Animated.Value(0),
        index: 0
    };

    render() {
        const iconAStyles = {
            color: 'rgb(102,33,101)',
            marginHorizontal: 10,
            transform: [{
                rotate: this.state.animation.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-0.3rad', '0.3rad']
                })
            }]
        };

        const ballInterpolation = this.state.ballAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [35, 96],
        });

        const ballStyle = {
            opacity: this.state.opacityAnimation,
            transform: [
                {translateX: ballInterpolation}
            ]
        };

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.startWobble}>
                    <Text style={styles.buttonText}>Move Ball</Text>
                </TouchableOpacity>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={styles.pickerBar}>
                        {
                            icons.map((item, index) => {
                                return index === this.state.index ?
                                    <AnimatedIcon key={`active_${item}`} name={item} style={iconAStyles} size={40}/> :
                                    <Icon key={`${item} ${index}`} style={{marginHorizontal: 10}} name={item}
                                          color={'rgb(180,180,180)'} size={40}/>
                            })
                        }
                    </View>
                    <View style={styles.track}>
                        <Animated.View style={[styles.ball, ballStyle]}/>
                    </View>
                </View>
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
        Animated.timing(this.state.ballAnimation, {
            toValue: lastItem ? this.state.index + 1 : 0,
            duration: 300,
            easing: Easing.elastic(.7),
            useNativeDriver: true
        }).start()
        Animated.sequence([
            Animated.timing(this.state.opacityAnimation, {
                toValue: 1,
                duration: 100,
                easing: Easing.elastic(.7),
                useNativeDriver: true
            }),
            Animated.delay(100),
            Animated.timing(this.state.opacityAnimation, {
                toValue: 0,
                duration: 50,
                easing: Easing.elastic(.7),
                useNativeDriver: true
            })
        ]).start()
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
        backgroundColor: 'rgb(231, 43, 89)'
    },
    pickerBar: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: 'rgb(222,222,222)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 30
    },
    track: {
        borderRadius: 30,
        top: -50
    },
    ball: {
        marginLeft: 10,
        marginTop: 5,
        width: 15,
        height: 15,
        backgroundColor: 'rgb(102,33,101)',
        borderRadius: 30
    },
    buttonText: {
      color: '#fff'
    },
    button: {
        marginTop: 10,
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        borderColor: 'rgba(64, 54, 102,0.5)',
        backgroundColor: 'rgb(64, 54, 102)',
    }
});
export default Tabber
