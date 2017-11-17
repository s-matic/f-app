import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { List, ListItem, colors} from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { style } from 'expo/src/Font';

const API_ENDPOINT = 'http://localhost:5002/api/';

export class FeedbackList extends React.Component {
    
    state = {
        feedbackList: {},
    };
    _keyExtractor = (item, isPositive) => item.id;
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
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => 
                <Grid style={styles.padding}>
                    <Col size={5} >
                    {
                        item.isPositive == true ?
                         <Feather name='thumbs-up' size={42} color='white' />
                        : 
                        <Feather name='thumbs-down' size={42} color='white' />                        
                        }
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
let bg = '#00B8FF';
let colorText = '#fff';
const styles = StyleSheet.create({
    contentContainer: {
    paddingVertical: 20
    },
    wrapper: {
        flex: 1,
        backgroundColor: bg,
    }, 
    container: {

    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        color: colorText,
    },
    item: {
        fontSize: 18,
        height: 80,
        alignSelf: 'center',
        color: colorText,
      },
      padding: {
        paddingHorizontal: 25
      }
});
