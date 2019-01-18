import React from 'react';
import {
        StyleSheet,
        Text,
        View,
        TouchableOpacity,
        TextInput,
        Button,
        KeyboardAvoidingView,
        Slider
       } from 'react-native';
import {
        createStackNavigator,
        createAppContainer
   } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={ () => this.props.navigation.navigate('Details')}
         >
        <Text style={styles.text}>START THE GAME</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Body extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      player: 1,
      theBot: 1,
      result: 1,
      clicks: 0,
    }
  }

  //In first click showResult() just add to result the value of bot and player
  //After that it adds the result too
    showResult = async () => {
    await this.winningStrategy;
        if (this.state.clicks < 1) {
          this.setState({
            result: +this.state.player + +this.state.theBot
          })
        } else if (this.state.clicks >= 1) {
        this.setState({
          result: +this.state.result + +this.state.player + +this.state.theBot
        })
      }
    }

    clickCount(){
      this.setState(prevState => ({
        clicks: ++prevState.clicks
      }))
    }

    winningStrategy() {
      this.setState({theBot: (11 - this.state.player)})
    }

    componentDidUpdate() {
      if (this.state.result >= 100) {
        this.props.navigation.navigate("Ending")
      }
    }

    change(player) {
    this.setState(() => {
      return {
        player: parseFloat(player),
      };
    });
    }

  render() {
    let {player} = this.state
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.text}>{String(player)}</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={1}
            maximumValue={10}
            onValueChange={this.change.bind(this)}
            value={player}
          />
        </View>
        <Text style={{margin: 10}}>THE BOT: {String(this.state.theBot)}</Text>
        <Text style={{margin: 10}}>RESULT: {String(this.state.result)}</Text>
        <Button
          id='count'
          title='Count'
          value='Count'
          onPress={() => {
            this.clickCount();
            this.winningStrategy();
            this.showResult();
          }} />
      </KeyboardAvoidingView>
    )
  }
}

class End extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.endingTitle}> YOU LOSE </Text>
        <TouchableOpacity
         style={styles.button}
         onPress={ () => this.props.navigation.navigate('Details')}
         >
        <Text style={styles.text}>START AGAIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Body,
    Ending: End,
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 70,
    width: 250,
    borderRadius:20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize:25,
    fontStyle:('normal','italic'),
    fontWeight:('700')
  },
  sliderContainer: {
    flexDirection: 'row'
  },
  slider: {
    flex: 0.95,
  },
  textInput: {
    height: 70,
    width: 250,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  result: {
    height: 50,
    width: 70,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#00BB3E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  endingTitle: {
    margin: 10,
    fontSize:55,
    fontStyle:('normal','italic'),
    fontWeight:('700')
  }
});
