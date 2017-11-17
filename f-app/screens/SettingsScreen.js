import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { Button } from 'react-native-elements'

const API_ENDPOINT = 'http://localhost:5002/api/';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Inställningar',
  };
  state = {
    userType: ''
  };
  getUserType() {
    try {
      const value = AsyncStorage.getItem('@FappStore:userType').then(function(){
        if (value !== null) {
          // We have data!!
          console.log(value);
          this.setState({userType: value})
        }
      }.bind(this));
    } catch (error) {
      // Error retrieving data'
      console.log(error);
    }
  }

  clearFeedback() {
    fetch(API_ENDPOINT + 'feedback', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function () {
      Alert.alert(
        'Feedback rensad',
        'Din feedbacklista har rensats!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    });
  }

  componentWillMount(){
    this.getUserType();
  }
  render() {
    console.log(this.state.userType);
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    let feedbackText = this.state.userType == 'sender' ? 'byt till att ta emot feedback' : 'byt till att ge feedback';

    return <View style={styles.contentContainer}> 
      <Button title='Rensa feedbacklista' onPress={() => { this.clearFeedback() }} />

      {/*<Button title={feedbackText} onPress={() => { this.clearFeedback() }} buttonStyle={{backgroundColor: 'blue'}} />*/}
    </View>;
  }
};
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
});
