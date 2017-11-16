import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { style } from 'expo/src/Font';
export class SendFeedback extends React.Component {
    state = {
        modalVisible: true,
    };

    saveFeedback(_isPositive) {
        fetch(PUSH_ENDPOINT + 'feedback', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isPositive: _isPositive
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
        //return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
        return <View style={styles.wrapper} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Skicka feedback</Text>
                <Grid>
                    <Col style={styles.center}>
                        <TouchableOpacity onPress={() => { this.saveFeedback(true) }}>
                            <Feather name='thumbs-up' size={82} color='green' />
                        </TouchableOpacity>
                    </Col>
                    <Col style={styles.center}>
                        <TouchableOpacity onPress={() => { this.saveFeedback(false) }}>
                            <Feather name='thumbs-down' size={82} color='red' />
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </View>
        </View>
    }
};
const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        marginTop: 150
    },
    center: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 200,
    },
    heading: {
        fontSize: 30,
        textAlign: 'center'
    }
});