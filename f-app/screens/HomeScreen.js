import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { GiveFeedback } from '../components/GiveFeedback';
import { ReceiveFeedback } from '../components/ReceiveFeedback';

const API_ENDPOINT = 'localhost:5000/api/';

export default class HomeScreen extends React.Component {
  state = {
    modalVisible: true,
    feedbackList: {}
  };
  static navigationOptions = {
    header: null,
  };

  saveUserType(userType) {
    try {
      AsyncStorage.setItem('@FappStore:userType', userType);
    } catch (error) {
      // Error saving data
    }
  }

  getUserType(){
    try {
      const value = AsyncStorage.getItem('@FappStore:userType');
      if (value !== null){
        // We have data!!
        console.log(value);

      }
    } catch (error) {
      // Error retrieving data
    }
  }

  getFeedback(){
    fetch(PUSH_ENDPOINT + 'feedback', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(result){
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
         <View style={styles.wrapper}>
          <View style={styles.flexContainer}>
            <Text style={styles.heading}>Välkommen till F-appen!</Text>

          <View style={styles.center}>
            <TouchableHighlight  onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={styles.giveFeedbackBtn}>Ge Feedback</Text>
            </TouchableHighlight>
            </View>
            <View style={styles.center}>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={styles.receiveFeedbackBtn}>Ta emot Feedback</Text>
            </TouchableHighlight>
            </View>
          </View>
         </View>
        </Modal>
        
        <GiveFeedback></GiveFeedback>
        <ReceiveFeedback></ReceiveFeedback>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
            
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
let giveFbg = '#103063';
let receiveFbg = '#103063';
let btnWidth = 220;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexContainer: {

  },
  wrapper: {
    marginTop: 22,
    paddingHorizontal: 10,
  },
  center: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    marginTop: 100,
    marginBottom:  50,
    fontSize: 36,
    textAlign: 'center',
  },
  giveFeedbackBtn: {
    color: '#fff',
    backgroundColor: giveFbg,
    paddingHorizontal: 10,
    paddingVertical: 25,
    width: btnWidth,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  receiveFeedbackBtn: {
    color: '#fff',
    backgroundColor: receiveFbg,
    paddingHorizontal: 10,
    paddingVertical: 25,
    width: btnWidth,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
