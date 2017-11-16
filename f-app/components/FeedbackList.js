import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { List, ListItem} from "react-native-elements";
import { Feather } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { style } from 'expo/src/Font';

export class FeedbackList extends React.Component {
    
    
    render() {
        return (
          <View style={styles.wrapper}>
            <FlatList
              data={[
                {created: 'Devin', feedback: '+1'},
                {created: 'Jackson', feedback: '+1'},
                {created: 'James', feedback: '+1'},
                {created: 'Joel',feedback: '+1'},
                {created: 'John',feedback: '+1'},
                {created: 'Jillian',feedback: '+1'},
                {created: 'Jimmy',feedback: '+1'},
                {created: 'Julie',feedback: '+1'},
              ]}
              renderItem={({item}) => 
                <Grid>
                    <Col size={5}>
                        <Text style={styles.item}>{item.created}</Text>
                    </Col>
                    <Col size={2}>
                        <Text style={styles.item}>{item.feedback}</Text>
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
        height: 44,
      },
});
