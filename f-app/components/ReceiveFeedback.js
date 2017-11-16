import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { FeedbackList } from '../components/FeedbackList';

const API_ENDPOINT = 'http://localhost:5002/api/';

const API_ENDPOINT = 'http://localhost:5002/api/';

export class ReceiveFeedback extends React.Component {
    getFeedback() {
        fetch(API_ENDPOINT + 'feedback', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(function (result) {
          let _feedbackList = {
            feedback: [
              {
                Id: 1,
                IsPositive: true,
                Created: '2017-11-16 11:27'
              },
              {
                id: 2,
                IsPositive: true,
                Created: '2017-11-16 11:36'
              },
              {
                id: 3,
                IsPositive: false,
                Created: '2017-11-16 12:10'
              }
            ]
          };
          this.setState({ feedbackList: _feedbackList });
        });
      }
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