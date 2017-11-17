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
  TouchableHighlight,
  AsyncStorage,
  StatusBar
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { WebBrowser } from 'expo';

import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { SendFeedback } from '../components/SendFeedback';
import { ReceiveFeedback } from '../components/ReceiveFeedback';
import { style } from 'expo/src/Font';

const API_ENDPOINT = 'localhost:5000/api/';

export default class HomeScreen extends React.Component {
  state = {
    modalVisible: true,
    feedbackList: {},
    userType: ''
  };
  static navigationOptions = {
    header: null,
  };

  saveUserType(userType) {
    try {
      AsyncStorage.setItem('@FappStore:userType', userType);
      this.setState({ userType: userType });
      console.log(this.state.userType);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  getUserType() {
    try {
      const value = AsyncStorage.getItem('@FappStore:userType');
      if (value !== null) {
        // We have data!!
        console.log(value);

      }
    } catch (error) {
      // Error retrieving data'
      console.log(error);
    }
  }

  setUserType(userType) {
    console.log('setUserType');
    this.saveUserType(userType);
    this.setModalVisible(!this.state.modalVisible);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  

  render() {
    let feedbackView = null;

    if(this.state.userType == 'sender')
      feedbackView = <SendFeedback></SendFeedback>

    if (this.state.userType == 'receiver')
      feedbackView = <ReceiveFeedback></ReceiveFeedback>

    return (
      <View style={styles.wrapper}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
        >
          <View style={styles.container}>
            <View style={styles.flexContainer}>
              <Text style={styles.heading}>Välkommen till </Text>
              <Text style={styles.headingBottom}> F-appen!</Text>

            <View style={styles.center}>
              <TouchableHighlight  onPress={() => {
                this.setUserType('sender')
              }}>
                <View style={styles.btnWrapper}>
                  <Text style={styles.SendFeedbackBtn}>Ge Feedback</Text>
                  <SimpleLineIcons name='present' size={30} color='white' />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.center}>
              <TouchableHighlight onPress={() => {
                this.setUserType('receiver')
              }}>
                <View style={styles.btnWrapper}>
                  <Text style={styles.receiveFeedbackBtn}>Ta emot Feedback</Text>
                  <MaterialIcons name='call-received' size={30} color='white' />
                </View>
              </TouchableHighlight>
            </View>
          </View>
          </View>
        </Modal>

        {feedbackView}

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
let giveFbg = '#00B8FF';
let receiveFbg = '#00B8FF';
let bg = '#00B8FF';
let btnWidth = 260;
let btnTextColor = '#fff';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: bg,
  },
  flexContainer: {

  },
  container: {
    marginTop: 22,
    paddingHorizontal: 10,
    backgroundColor: bg,
    height: 10000
  },
  center: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    marginTop: 100,
    
    fontSize: 40,
    textAlign: 'center',
    color: '#fff'
  },
  headingBottom: {
    fontSize:40, 
    color:'#fff', 
    marginBottom: 50, 
    textAlign: 'center'
  },
  SendFeedbackBtn: {
    color: btnTextColor,
    paddingHorizontal: 10,
    paddingVertical: 25,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  receiveFeedbackBtn: {
    color: btnTextColor,
    backgroundColor: receiveFbg,
    paddingHorizontal: 10,
    paddingVertical: 25,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: giveFbg,
    alignItems: 'center',
    justifyContent: 'center',
    width: btnWidth,
    borderColor: btnTextColor,
    borderWidth: 2,
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
