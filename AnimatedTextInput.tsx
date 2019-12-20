import React from "react";
import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface AnimatedTextInputState {
    animation: Animated.Value
    open: boolean
}

interface AnimatedTextInputProps {
    width: number,
    height: number
}


class AnimatedTextInput extends React.Component<AnimatedTextInputProps, AnimatedTextInputState> {
    state = {
        animation: new Animated.Value(0),
        open: false
    };
    private _input: any;
    private _open: any;

    render() {
        const opacityToolbarInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.2],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const editorWidthInterpolate = this.state.animation.interpolate({
            inputRange: [0.7, 1],
            outputRange: [0, this.props.width],
            extrapolate: 'clamp'
        });
        const editorHeightInterpolate = this.state.animation.interpolate({
            inputRange: [0.7, 1],
            outputRange: [0, this.props.height],
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
            }],
            width: this.props.width

        };

        const buttonStyle = {
            opacity: scaleBarInterpolate,
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
                        <Animated.View style={[styles.button, buttonStyle]}>
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
        const toValue = this._open ? 0 : 1;

        Animated.timing(this.state.animation, {
            toValue,
            duration: 700,
        }).start(() => {
            this._open = !this._open;
            if(!this._open){
                Keyboard.dismiss()
            }else {
                this._input.focus()
            }
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
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    toolbar: {
        alignItems: 'center',
        height: 50,
        backgroundColor: '#2979ff',
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
        paddingTop: 15,
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

export default AnimatedTextInput;
