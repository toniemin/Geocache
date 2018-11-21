import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';


// TODO: make a timer component
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secs: 0,
      mins: 0
    };
  }
  
  
}

export default class Geocache extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  /* Hard coded JSON data.
   * This should be stored in the server!
   */
  var databaseData = 
  {
    "UTAPinniBLobby": {
      "Q1": {
        "Question":"PinniB question sample #1",
        "Hints":["Hint 1", "Hint 2", "Hint 3"],
        "Answer":"PinniB answer #1"
      }, 
      "Q2": {
        "Question":"Question sample #2",
        "Hints":["Hint 1", "Hint 2", "Hint3"],
        "Answer":"PinniB answer #2"
      }
    },
    "UTAMainLobby": {
      "Q1": {
        "Question":"MainB question sample #1",
        "Hints:":["Hint 1", "Hint 2", "Hint 3"],
        "Answer":"MainB answer #1"
      }
    }
  }
  
  /* Mock function for QR-code input.
   * The return value in this is given by the main app.
   */
  getCode() {
    return "UTAPinniBLobby";
  }
  
  /*
   * Returns the cache data for the game.
   * This function should connect to the database to fetch the cache data.
   */
  getCache(room_id) {
    // Get the caches for this room from the server.
    var caches = JSON.parse(databaseData)[room_id];
    
    // Get a random cache.
    var i = Math.floor( Math.random() * (Object.keys(caches).length + 1) );
    
    return caches.["Q"+i];
  }
  
  // TODO: send score to server. 
  // Uses time (time), fails (int) and hintsUsed (int) for calculation.
  sendScore(time, fails, hintsUsed) {
    
  }
  
  render() {
    // "Scan QR-code." Not really tho.
    var code = getCode();
    // Get cache data.
    var cache = this.getCache(code);
    
    // TODO: start a timer.
    
    return(
      <View>
        <Text>
         {cache["Question"]}
        </Text>
        <TextInput
          placeholder="Type your answer here!" 
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={() => {
             // Check if user input was correct.
            if (this.state.text === cache["Answer"]) {
              Alert.alert("Correct!");
              // TODO: redirect user to some sort of 'success screen'.
              // TODO: stop timer
              // TODO: send score
            }
            else {
               Alert.alert("Wrong!");
               // TODO: track wrong answers (fails)
               // TODO: return to text input.
            }
            
          }} 
          title="Submit"
        />
        <Text>Time elapsed: 404</Text> {/*TODO: timer output here.*/}
          {/*TODO: "Give hint -button here.*/}
      </View>
      );
    
  }
}