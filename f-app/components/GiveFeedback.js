import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableHighlight } from 'react-native';

export class GiveFeedback extends React.Component {
    state = {
        modalVisible: true,
      };
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
  render() {
    //return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
    return <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View>  
                    <TouchableHighlight  onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                        <Text style={styles.giveFeedbackBtn}>Bra</Text>
                    </TouchableHighlight>
                    <TouchableHighlight  onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                        <Text style={styles.giveFeedbackBtn}>Dåligt</Text>
                    </TouchableHighlight>
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