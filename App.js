import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';


export default class Geocache extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  getQuizPair() {
    let juttu = ["Question 1", "Answer 1"];
    return juttu;
  }
  
  render() {
    // Get question and answer strings.
    let quiz = getQuizPair();
    
    return(
      <View>
        <Text>
          Moi
        </Text>
        <TextInput
          placeholder="Type your answer here!" 
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={() => {
            Alert.alert("Correct!");
          }} 
          title="Submit"
        />
      </View>
      );
    
  }
}