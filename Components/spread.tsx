import React from "react";
import {Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";

class Spread extends React.Component<{}, { visible: boolean }> {
    animatedValue: any;
    value: number = 0;
    valueMax: number = 0;
    actionSheetInterpolation: Animated.AnimatedInterpolation;
    cancelItemInterpolation: Animated.AnimatedInterpolation;
    itemInterpolators: Animated.AnimatedInterpolation[] = [];

    constructor(props: {}) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({value}: any) => {
            this.value = value;
        });
        let items = [1, 2, 3, 5, 4 ,5];
        let inputRange = [0, 50, 100];
        this.setInputRange(items, inputRange);
        this.valueMax = inputRange[inputRange.length - 1]
        const outputContainerRange = [50, -50, -50, ...items.map(() => -50)];
        const outputCancelRange = [0, -200 / 4, -200 / 4, ...items.map(() => -200 / 4)];
        this.actionSheetInterpolation = this.animatedValue.interpolate({
            inputRange: inputRange,
            outputRange: outputContainerRange
        });
        this.cancelItemInterpolation = this.animatedValue.interpolate({
            inputRange: inputRange,
            outputRange: outputCancelRange
        });


        let defaultRange = [0, -200 / 4, -750 / 4, ...items.map(() => 0)];
        let target = 520;
        for (let i = items.length; i > 0; i--) {
            const outputRange = this.setOutputRange(defaultRange, i, target);
            this.itemInterpolators.push(
                this.animatedValue.interpolate({
                    inputRange: inputRange,
                    outputRange: outputRange
                }));
            defaultRange = outputRange;
            target += 240
        }

        this.state = {visible: false}
    }

    private setOutputRange(overrideOutput: number[], index: number, target: number) {
        let outputRange = [...overrideOutput];
        for (let i = 0; i <= index; ++i) {
            let value = (i == index) ? target : target - 30;
            let targetVariable = (outputRange.length - 1) - i;
            outputRange[(targetVariable)] = -((value + 50)) / 4
        }
        return outputRange;
    }

    private setInputRange(items: any[], inputRange: number[]) {
        for (let i = 1; i <= items.length; i++) {
            let previousValue = inputRange[inputRange.length - 1];
            inputRange.push(previousValue + 50)
        }
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                tension: 10,
                friction: 400

            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: this.valueMax,
                tension: 10,
                friction: 400
            }).start();
        }
        this.setState({visible: !this.state.visible})
    }

    render() {
        const actionSheetStyle = {
            transform: [
                {translateY: this.actionSheetInterpolation}
            ]
        }
        const baseAnimatedStyle = {
            transform: [
                {translateY: this.cancelItemInterpolation}
            ]
        }

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this.flipCard()}>
                    <Text style={styles.buttonText}>Toggle</Text>
                </TouchableOpacity>
                <Animated.View style={[styles.actionSheetContainer, actionSheetStyle]}>
                    <Animated.View style={[styles.listItem, baseAnimatedStyle]}>
                        <Text style={styles.flipText}>
                            CANCEL
                        </Text>
                    </Animated.View>
                    {
                        this.itemInterpolators.map((item) => {
                                return (<Animated.View style={[styles.listItem, {
                                        transform: [
                                            {translateY: item}
                                        ]
                                    }]}>
                                        <Text style={styles.flipText}>
                                            This text is Spreading.
                                        </Text>
                                    </Animated.View>
                                )
                            }
                        )
                    }
                </Animated.View>
            </SafeAreaView>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(231, 43, 89)',
        alignItems: "center"
    },
    actionSheetContainer: {
        position: 'absolute',
        width: '90%',
        bottom: -50
    },
    listItem: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        backgroundColor: 'rgb(64, 54, 102)',
        bottom: 0,
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(64, 54, 102,0.5)',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgb(64, 54, 102)'
    },
    buttonText: {
        color: '#fff'
    }
});

export default Spread;

