import {Animated, Text, SafeAreaView, StyleSheet, TouchableOpacity, View, Easing} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface TabberState {
    animation: Animated.Value
    animatedWobbleValue: Animated.Value
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Tabber extends React.Component {
    state = {
        animation: new Animated.Value(0),
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

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.pickerBar}>
                    {this.state.index === 0 ? <AnimatedIcon name={'beats'} style={iconAStyles} size={30}/> : <Icon name={'beats'} color={'rgb(180,180,180)'} size={30}/>}
                    {this.state.index === 1 ? <AnimatedIcon name={'bomb'} style={iconAStyles} size={30}/> : <Icon name={'bomb'} color={'rgb(180,180,180)'} size={30}/>}
                    {this.state.index === 2 ? <AnimatedIcon name={'alien'} style={iconAStyles} size={30}/> : <Icon name={'alien'} color={'rgb(180,180,180)'} size={30}/>}
                    {this.state.index === 3 ? <AnimatedIcon name={'alarm-snooze'} style={iconAStyles} size={30}/> : <Icon name={'alarm-snooze'} color={'rgb(180,180,180)'} size={30}/>}
                    {this.state.index === 4 ? <AnimatedIcon name={'bell'} style={iconAStyles} size={30}/> : <Icon name={'bell'} color={'rgb(180,180,180)'} size={30}/>}
                </View>
                <TouchableOpacity onPress={this.startWobble}>
                    <Text>StartAnimation</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    startWobble = () => {
        this.setState({index: ++this.state.index});
        Animated.sequence([
            Animated.timing(this.state.animation, {
                toValue: 1.0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(this.state.animation, {
                toValue: -1.0,
                duration: 300,
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
        width: 300,
        backgroundColor: 'rgb(222,222,222)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 50
    }
});
export default Tabber
