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
import {
    SafeAreaView,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    View,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Text, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EvolvingButtonState {
    animation: Animated.Value
    open: boolean
}

const {width} = Dimensions.get('window')

class App extends React.Component<{}, EvolvingButtonState> {
    state = {
        animation: new Animated.Value(0),
        open: false
    };
    private _input: any;
    private _open: any;

    render() {


        const opacityToolbarInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });


        const editorWidthInterpolate = this.state.animation.interpolate({
            inputRange: [0.7, 1],
            outputRange: [0, width - 40],
            extrapolate: 'clamp'
        });

        const editorHeightInterpolate = this.state.animation.interpolate({
            inputRange: [0.7, 1],
            outputRange: [0, 150],
            extrapolate: 'clamp'
        });

        const opacityButtonInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.4],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const scaleBarInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.5],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        const scaleToolbarInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.5],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const editorStyle = {
            width: editorWidthInterpolate,
            height: editorHeightInterpolate
        };

        const toolbarStyles = {
            opacity: opacityToolbarInterpolate,
            transform: [{
                scaleX: scaleToolbarInterpolate
            }]
        }


        const buttonStyle = {
            opacity: opacityButtonInterpolate,
            transform: [{
                scaleX: scaleBarInterpolate
            }]
        };

        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={'padding'}>
                    <View style={{alignItems: 'center'}}>
                        <Animated.View style={[styles.toolbar, toolbarStyles]}>
                            <Icon name={'format-bold'} color={'#FFF'} size={20}/>
                            <Icon name={'format-italic'} color={'#FFF'} size={20}/>
                            <Icon name={'format-underline'} color={'#FFF'} size={20}/>
                            <Icon name={'format-list-bulleted'} color={'#FFF'} size={20}/>
                            <Icon name={'format-list-numbered'} color={'#FFF'} size={20}/>
                            <View style={styles.rightInnerBar}>
                                <Icon name={'link'} color={'#FFF'} size={20}/>
                                <Icon name={'image'} color={'#FFF'} size={20}/>
                                <Icon name={'arrow-down-bold-box'} color={'#FFF'} size={20}/>
                                <Icon name={'close'} color={'#FFF'} size={20}
                                      onPress={this.toggleTransform}/>
                            </View>
                        </Animated.View>
                        <Animated.View style={[styles.button, buttonStyle]}
                                       pointerEvents={this.state.open ? 'none' : 'auto'}
                        >
                            <TouchableWithoutFeedback onPress={this.toggleTransform}>
                                <Text style={styles.buttonText}>WRITE</Text>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                    <Animated.View style={[styles.editor, editorStyle]}>
                        <TextInput placeholder={'Start writing....'}
                                   multiline
                                   ref={input => this._input = input}
                                   style={[styles.input]}/>
                    </Animated.View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }

    toggleTransform = () => {
        const toValue = this._open ? 0 : 1

        Animated.timing(this.state.animation, {
            toValue,
            duration: 700,
        }).start(() => {
            this._open = !this._open;
            this.setState({open: this._open})
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editor: {
        height: 150,
        width: width - 40,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    toolbar: {
        alignItems: 'center',
        height: 50,
        backgroundColor: '#2979ff',
        width: width - 40,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'flex-start'
    },
    rightInnerBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    input: {
        padding: 10,
        fontSize: 20
    },
    buttonText: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        lineHeight: Platform.OS === 'ios' ? 45 : 20,
        color: '#FFF'
    },
    button: {
        top: 0,
        bottom: 0,
        position: 'absolute',
        width: 100,
        backgroundColor: '#2979ff',
        height: 50
    }
});

export default App;
