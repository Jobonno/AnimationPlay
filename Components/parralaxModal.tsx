import {
    Alert, Animated,
    Dimensions,
    Modal, NativeEventEmitter, NativeScrollEvent, NativeSyntheticEvent,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import * as React from "react";

class ParralaxModal extends React.Component<{}> {


    state = {
        modalVisible: false,
        animation: new Animated.Value(0)
    };

    setModalVisible(visible: boolean) {
        this.setState({modalVisible: visible});
    }

    handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.spring(this.state.animation, {
            toValue: event.nativeEvent.contentOffset.x,
            tension: 50,
            friction: 100
        }).start();
    };

    render() {
        const newDeviceWidth = deviceWidth;
        const actionSheetInterpolation = this.state.animation.interpolate({
            inputRange: [0, deviceWidth, deviceWidth * 2, deviceWidth * 3],
            outputRange: [deviceWidth * -3 - 150, (deviceWidth * -2) - 50, deviceWidth * -1 + 50, 100],
            // extrapolate: 'clamp'

        });
        const actionSheetInterpolationSlow = this.state.animation.interpolate({
            inputRange: [0, deviceWidth, deviceWidth * 2, deviceWidth * 3],
            outputRange: [deviceWidth * -3 + 150, (deviceWidth * -2) - 50, (deviceWidth * -1) - 150, -350],
            // extrapolate: 'clamp'
        });

        const scaleInterpolationBig = this.state.animation.interpolate({
            inputRange: [0, deviceWidth, deviceWidth * 2, deviceWidth * 3],
            outputRange: [2, 6, 10, 12]
        });

        const translateAnimation = {
            transform: [
                {translateX: actionSheetInterpolation},
            ],
        };

        const translateAnimationSlow = {
            transform: [
                {translateX: actionSheetInterpolationSlow},
                // {scale: scaleInterpolationBig}
            ],
        };

        return (
            <SafeAreaView style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <SafeAreaView style={styles.container}>
                        <View>
                            <ScrollView scrollEventThrottle={16} horizontal={true} pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false} onScroll={this.handleScroll}>

                                <View style={styles.firstView}>
                                    <Text style={[styles.headerText]}>First View</Text>
                                </View>

                                <View style={styles.secondView}>
                                    <Text style={styles.headerText}>Second View</Text>
                                </View>

                                <View style={styles.thirdView}>
                                    <Text style={styles.headerText}>Third View</Text>
                                </View>

                                <View style={styles.forthView}>
                                    <Animated.View useNativeDriver style={[styles.headerTextSmall, translateAnimation]}>
                                        {/*<Text style={styles.headerText}>Fourth View</Text>*/}
                                    </Animated.View>
                                    <Text style={styles.headerText}>Fourth View</Text>

                                    <Animated.View useNativeDriver style={[styles.headerTextBig, translateAnimationSlow]}>
                                        {/*<Text style={styles.headerText}>Fourth View</Text>*/}
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text>Hide Modal</Text>
                                        </TouchableHighlight>
                                    </Animated.View>
                                </View>
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#e5e5e5",
    },
    headerText: {
        fontSize: 30,
        textAlign: "center",
        margin: 10,
        // color: 'white',
        fontWeight: "bold"
    },
    headerTextSmall: {
        backgroundColor: 'tomato',
        borderRadius: 100,
        fontSize: 30,
        width: 50,
        height: 50,
        textAlign: "center",
        margin: 10,
        color: 'white',
        fontWeight: "bold"
    },
    headerTextBig: {
        backgroundColor: 'tomato',
        borderRadius: 100,
        fontSize: 30,
        width: 200,
        height: 200,
        textAlign: "center",
        margin: 10,
        color: 'white',
        fontWeight: "bold"
    },
    firstView: {
        width: deviceWidth,
        // backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    secondView: {
        width: deviceWidth,
        // backgroundColor: '#9C27B0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    thirdView: {
        width: deviceWidth,
        // backgroundColor: '#3F51B5',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    forthView: {
        width: deviceWidth,
        // backgroundColor: '#009688',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column'
    },

});

export default ParralaxModal