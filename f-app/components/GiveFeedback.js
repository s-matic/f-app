import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { style } from 'expo/src/Font';
export class GiveFeedback extends React.Component {
    state = {
        modalVisible: true,
    };
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    saveFeedback(feedback) {
        fetch(PUSH_ENDPOINT + 'feedback', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                    value: token,
                },
            }),
        })
    }
    render() {
        //return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
        return <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View>
                <Grid>
                    <Col style={styles.center}>
                        <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <Feather name='thumbs-up' size={82} color='green' />
                        </TouchableHighlight>
                    </Col>
                    <Col style={styles.center}>
                        <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <Feather name='thumbs-down' size={82} color='red' />
                        </TouchableHighlight>
                    </Col>
                </Grid>
            </View>
        </ScrollView>
    }
};
const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 200,
    },
});