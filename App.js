import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';


export default class Geocache extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  /*
   * Returns the question and answer pair.
   * This function should connect to the database to fetch the qa-pair.
   */
  getQuizPair() {
    return ["Question 1", "Answer 1"];
  }
  
  render() {
    // Get question and answer strings.
    var quiz = this.getQuizPair();
    
    return(
      <View>
        <Text>
         {quiz[0]}
        </Text>
        <TextInput
          placeholder="Type your answer here!" 
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={() => {
             // Check if user input was correct.
             // Correct answer can redirect user to some sort of 'success screen'.
            if (this.state.text === quiz[1]) {
              Alert.alert("Correct!");
            }
            else {
               Alert.alert("Wrong!");
            }
          }} 
          title="Submit"
        />
      </View>
      );
    
  }
}