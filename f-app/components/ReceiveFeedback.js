import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

export class ReceiveFeedback extends React.Component {
  render() {
    //return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
    return <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View>
                <Text>HEJ DÅ</Text>
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
    }
});