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
} from 'react-native';
import * as React from 'react';

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
        const actionSheetInterpolation = this.state.animation.interpolate({
            inputRange: [0, deviceWidth, deviceWidth * 2, deviceWidth * 3],
            outputRange: [deviceWidth * -3 - 150, (deviceWidth * -2) - 50, deviceWidth * -1 + 50, 100],

        });
        const actionSheetInterpolationSlow = this.state.animation.interpolate({
            inputRange: [0, deviceWidth, deviceWidth * 2, deviceWidth * 3],
            outputRange: [deviceWidth * -3 + 150, (deviceWidth * -2) - 50, (deviceWidth * -1) - 150, -350],
        });

        const translateAnimation = {
            transform: [
                {translateX: actionSheetInterpolation},
            ],
        };

        const translateAnimationSlow = {
            transform: [
                {translateX: actionSheetInterpolationSlow},
            ],
        };

        return (
            <SafeAreaView style={{paddingTop: 22, backgroundColor: 'rgb(231, 43, 89)', flex: 1}}>
                <Modal
                    animationType='slide'
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

                                    <Animated.View useNativeDriver
                                                   style={[styles.headerTextBig, translateAnimationSlow]}>
                                        {/*<Text style={styles.headerText}>Fourth View</Text>*/}
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text style={{color: 'white'}}>Hide Modal</Text>
                                        </TouchableHighlight>
                                    </Animated.View>
                                </View>
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                </Modal>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text style={styles.buttonText}>Show Modal</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(231, 43, 89)',
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: 'rgba(64, 54, 102,0.5)',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgb(64, 54, 102)',
    },
    buttonText: {
        color: '#fff'
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    headerTextSmall: {
        backgroundColor: 'rgb(64, 54, 102)',
        borderRadius: 100,
        fontSize: 30,
        width: 50,
        height: 50,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    headerTextBig: {
        backgroundColor: 'rgb(64, 54, 102)',
        borderRadius: 100,
        fontSize: 30,
        width: 200,
        height: 200,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    firstView: {
        width: deviceWidth,
        backgroundColor: 'rgb(231, 43, 89)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    secondView: {
        width: deviceWidth,
        backgroundColor: 'rgb(231, 43, 89)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    thirdView: {
        width: deviceWidth,
        backgroundColor: 'rgb(231, 43, 89)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    forthView: {
        width: deviceWidth,
        backgroundColor: 'rgb(231, 43, 89)',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column'
    },

});

export default ParralaxModal