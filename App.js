import React, { Component } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';


/*
 * A simple timer component that displays time elapsed since component mounting.
 * Time is displayed in "min:secs" format.
 */
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secs: 0,
      mins: 0,
    };
  }

  componentDidMount() {
    this.start = new Date().getTime();
    this.interval = setInterval(() => {
      var distanceSecs = ((new Date()).getTime() - this.start) / 1000;
      var minutes = Math.floor(distanceSecs / 60);
      var seconds = Math.floor(distanceSecs - (minutes * 60));

      this.setState({
        mins: minutes,
        secs: seconds
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Text style={this.props.style}>
        Time elapsed:
        {this.state.mins}:
        {(this.state.secs < 10) ? ("0" + this.state.secs) : this.state.secs}
      </Text>
    );
  }

}

const tuniColor = '#4e008e';

/*
 * Styles for the Geocache component
 */
const geoStyles = StyleSheet.create({
  button: {
    color: 'black'
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginTop: 10
  },
  container: {
    flex: 1
  },
  contents: {
    flex: 3,
    justifyContent: 'flex-start'
  },
  header: {
    alignItems: 'stretch',
    backgroundColor: tuniColor,
    justifyContent: 'flex-end',
    flex: 1/5
  },
  widget: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: tuniColor,
    justifyContent: 'center',
    flex: 1 / 6,
    marginHorizontal: 40,
    marginVertical: 20
  },
  timer: {
    backgroundColor: tuniColor,
    height: 20,
    marginHorizontal: 40,
    marginVertical: 20
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 28
  },
  footer: {
    flex: 1
  }
});

/*
 * Main component of this app.
 */
export default class Geocache extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      fails: 0,
      hintsUsed: 0,
      done: false
    };
    // This is where QR-code data should be used. Fetch cache data form JSON.
    this.cache = this.getCache(this.getCode());
    // Save the starting time of the game (used in scoring).
    this.startTime = new Date().getTime();

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
    var i = Math.floor(Math.random() * (Object.keys(caches).length)) + 1;

    var key = "Q" + i;
    return caches[key];
  }

  // TODO: send score to server. 
  // Uses time (time), fails (int) and hintsUsed (int) for calculation.
  sendScore(time, fails, hintsUsed) {
    Alert.alert("Correct! Time elapsed: " + time + "ms, wrong answers: " + fails + ", hints used: " + hintsUsed);
  }

  render() {
    if (this.state.done) {
      // Calculate time elapsed.
      var timeElapsedSecs = ((new Date().getTime()) - this.startTime) / 1000;
      var minutes = Math.floor(timeElapsedSecs / 60);
      var seconds = Math.floor(timeElapsedSecs - (minutes * 60));
      // Get fails-count.
      var fails = this.state.fails;
      // Get amount of hints used.
      var hints = this.state.hintsUsed;

      return (
        <View style={geoStyles.container}>
          <View style={geoStyles.header}>
            <Text style={[geoStyles.text, geoStyles.headerText]}>
              Geocache
            </Text>
          </View>
          <View style={geoStyles.contents}>

            <View style={geoStyles.widget}>
              <Text style={geoStyles.text}>
                Correct answer!{'\n'}
                Total time used: {minutes}:{(seconds < 10) ? ("0" + seconds) : seconds}{'\n'}
                Wrong answers: {fails}{'\n'}
                Hints used: {hints}
              </Text>
            </View>

          </View>
        </View>
      );
    }

    return (
      <View style={geoStyles.container}>
        <View style={geoStyles.header}>
          <Text style={[geoStyles.text, geoStyles.headerText]}>
            Geocache
            </Text>
        </View>
        <View style={geoStyles.contents}>
          <View style={geoStyles.timer}>
            <Timer style={geoStyles.text} />
          </View>
          <View style={geoStyles.widget}>
            <Text style={geoStyles.text}>
              {this.cache["Question"]}
            </Text>
          </View>
          <View style={geoStyles.widget}>
            <TextInput
              placeholder="Type your answer here!"
              onChangeText={(text) => this.setState({ text })}
              style={geoStyles.text}
              autoFocus={true}
            />
            <View style={geoStyles.buttonContainer}>
              <Button
                style={geoStyles.button}
                color={geoStyles.button.color}
                onPress={() => {
                  // Check if user input was correct.
                  if (this.state.text === this.cache["Answer"]) {
                    this.setState(
                      {done: true}
                    );
                  }
                  else {
                    Alert.alert("Wrong!");
                    // Track fails.
                    this.setState(previousState => (
                      { fails: fails + 1 }
                    ));
                  }
                }}
                title="Submit"
              />
            </View>
          </View>
        </View>
        <View style={geoStyles.footer}></View>
      </View>
    );

  }
}