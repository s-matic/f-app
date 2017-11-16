import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { List, ListItem} from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { style } from 'expo/src/Font';

const API_ENDPOINT = 'http://localhost:5002/api/';

export class FeedbackList extends React.Component {
    
    state = {
        feedbackList: {},
    };

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
        }.bind(this));
      }
    componentWillMount(){
        this.getFeedback();
    }
    render() {
        console.log(this.state.feedbackList);        
        return (
          <View style={styles.wrapper}>
            <FlatList
              data={this.state.feedbackList.feedback}
              renderItem={({item}) => 
                <Grid>
                    <Col size={5}>
                    {
                        item.IsPositive == true ?
                         <Image source={require('../assets/images/robot-dev.png')}/> 
                        : 
                        <Image source={require('../assets/images/robot-prod.png')}/>                         
                        }
                        <Text style={styles.item}></Text>
                    </Col>
                    <Col size={4}>
                        <Text style={styles.item}>{item.Created}</Text>
                    </Col>
                  </Grid>
                }
            />
          </View>
        );
      }
}
const styles = StyleSheet.create({
    contentContainer: {
    paddingVertical: 20
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',

    }, 
    container: {

    },
    heading: {
        fontSize: 30,
        textAlign: 'center'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 60,
      },
});
