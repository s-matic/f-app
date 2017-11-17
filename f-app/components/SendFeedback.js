import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { style } from 'expo/src/Font';
import { colors } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';

const API_ENDPOINT = 'http://localhost:5002/api/';

export class SendFeedback extends React.Component {
    state = {
        modalVisible: true,
    };
    saveFeedback(_isPositive) {
        fetch(API_ENDPOINT + 'feedback', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isPositive: _isPositive,
                isOverrideAble: this.state.instantFeedback
            }),
        }).then(function () {
            Alert.alert(
                'Feedback mottagen',
                'Din feedback har registrerats och tagits emot av mottagaren!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        });
    }
    render() {
        return <View style={styles.wrapper} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Skicka feedback</Text>
                <View>
                    <Grid>
                        <Col style={styles.center}>
                            <TouchableOpacity onPress={() => { this.saveFeedback(true) }}>
                                <Feather name='thumbs-up' size={82} color='white' />
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.center}>
                            <TouchableOpacity onPress={() => { this.saveFeedback(false) }}>
                                <Feather name='thumbs-down' size={82} color='white' />
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                </View>
                <View style={styles.mTop}>
                    <CheckBox
                    title='Direkt feedback'
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxText}
                    center= {true}
                    uncheckedColor= '#fff'
                    checked={this.state.instantFeedback}
                    checkedColor='#244398'
                    onPress={() => {
                        value = !this.state.instantFeedback;
                        this.setState({instantFeedback: value})
                    }}
                    />
              </View>
            </View>
        </View>
    }
};
let bg = '#00B8FF';
let textColor = '#fff';
const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    },
    wrapper: {
        flex: 1,
        backgroundColor: bg,
    },
    container: {
        marginTop: 70
    },
    center: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 60,
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        color: textColor,
    },
    mTop: {
        marginTop: 185
      },
    checkboxContainer: {
        backgroundColor: bg,
        borderWidth: 0,
    },
    checkboxText: {
        color: '#fff',
        fontSize: 20
    }

});