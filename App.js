import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';


// TODO: make a timer component
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secs: 0,
      mins: 0
    };

    this.start = new Date();
    this.interval;
  }

  componentDidMount() {
    this.start = new Date();
    this.interval = setInterval(this.tick, 1000);
  }

  tick() {
    var millis = new Date().getMilliseconds();// - this.start.getMilliseconds();

    this.setState({
      secs: ((millis % 60000) / 1000)//.toFixed(0)
    });

    this.setState({
      mins: Math.floor(millis / 60000)
    });


/*
    this.setState(
      {
      secs: ((millis % 60000) / 1000),//.toFixed(0),
      mins: Math.floor(millis / 60000)
    });*/
    //this.state.mins = Math.floor(millis / 60000);
    //this.state.secs = ((millis % 60000) / 1000).toFixed(0);
    
    //this.render();
  }

  componentWillUnmount() {
    this.clearInterval(this.interval);
  }
  
  render() {
     return(
      <Text>
        Time elapsed: {this.state.mins}:{this.state.secs}
      </Text>
      );
  }
  
}

const geoStyles = StyleSheet.create({
   text: {
      flex: 1,
      backgroundColor: 'blue'
   },
   button: {
   }
});

export default class Geocache extends Component {
  constructor(props) {
    super(props);
    this.state = {
       text: '',
       fails: 0,
       hintsUsed: 0
    };
    
    // Scan the QR-code (not really tho)
    // and fetch cache data using it.
    this.cache = this.getCache(this.getCode());
    
    
    // TODO: start a timer.
    
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
    var caches = JSON.parse('{"UTAPinniBLobby":{"Q1":{"Question":"PinniB question sample #1","Hints":["Hint 1", "Hint 2", "Hint 3"],"Answer":"PinniB answer #1"}, "Q2": {"Question":"Question sample #2","Hints":["Hint 1", "Hint 2", "Hint3"],"Answer":"PinniB answer #2"}},"UTAMainLobby": {"Q1": {"Question":"MainB question sample #1","Hints:":["Hint 1", "Hint 2", "Hint 3"],"Answer":"MainB answer #1"}}}')[room_id];
    
    // Get a random cache.
    var i = Math.floor( Math.random() * (Object.keys(caches).length) ) + 1;
    
    var key = "Q"+i;
    return caches[key];
  }
  
  // TODO: send score to server. 
  // Uses time (time), fails (int) and hintsUsed (int) for calculation.
  sendScore(time, fails, hintsUsed) {
    
  }
  
  render() {
    return(
      <View>
        <Text>
         {this.cache["Question"]}
        </Text>
        <TextInput
          placeholder="Type your answer here!" 
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          style={geoStyles.button}
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
        <Timer/>
      </View>
      );
    
  }
}