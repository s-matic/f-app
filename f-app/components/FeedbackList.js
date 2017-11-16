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
        })
        .then((response) => response.json())
        .then(function (responseJSON){
          let _feedbackList = responseJSON;
          console.log(_feedbackList);
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
              data={this.state.feedbackList}
              renderItem={({item}) => 
                <Grid>
                    <Col size={5}>
                    {
                        item.isPositive == true ?
                         <Feather name='thumbs-up' size={42} color='green' />
                        : 
                        <Feather name='thumbs-down' size={42} color='red' />                        
                        }
                        <Text style={styles.item}></Text>
                    </Col>
                    <Col size={4}>
                        <Text style={styles.item}>{item.date}</Text>
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
