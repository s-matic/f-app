import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { FeedbackList } from '../components/FeedbackList';

const API_ENDPOINT = 'http://localhost:5002/api/';

export class ReceiveFeedback extends React.Component {
    
  render() {
    //return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
    return (
        <ScrollView style={styles.wrapper} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Feedback</Text>
            </View>
            <View>
                <FeedbackList></FeedbackList>
            </View>
        </ScrollView>);
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
        marginTop: 20
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    }
});