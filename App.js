import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, Slider } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         <TouchableOpacity
         style={styles.button}
         onPress={ () => this.props.navigation.navigate('Details')}
         >
           <Text style={styles.text}>Start The Game</Text>
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
      theBot: 0,
      result: 0,
      clicks: 0,
    }
  }


    showResult() {



      if (this.state.player >= 1 && this.state.player <= 10) {

    //arajin kliki jamanak uxaki player-y u bot-y gumaruma irar,2rdic sksac arden resultnela gumarum
    if (this.state.clicks <= 1) {
        this.setState({
          result: +this.state.player + +this.state.theBot
        })
    } else if (this.state.clicks > 1) {
      this.setState({result: (+this.state.result + +this.state.player + +this.state.theBot)})
      }

     else {
      alert(false);
    }}
 }

    clickCount(){
      this.setState(prevState => ({
        clicks: ++prevState.clicks
      }))
    }

    //winningStrategy-um taqnvaca es xaxi gaxtniqy ;)
    winningStrategy() {
      this.setState({theBot: (11 - this.state.player)})
    }



    change(player) {
    this.setState(() => {
      return {
        player: parseFloat(player),
      };
    });
}



  render() {
    const {player} = this.state
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.text}>{String(player)}</Text>
        <Slider
            style={styles.slider}
            step={1}
            minimumValue={1}
            maximumValue={10}
            onValueChange={(player) => this.setState({player})}
            value={player}
          />
        <Text style={{margin: 10}}>RESULT: {String(this.state.result)}</Text>
        <Text style={{margin: 10}}>THE BOT: {String(this.state.theBot)}</Text>
        <Button
          id='count'
          title='Count'
          value='Count'
          onPress={(event) => {
            this.showResult();
            this.clickCount();
            this.winningStrategy();
          }} />
      </KeyboardAvoidingView>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Body
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
  slider: {
    width:550,
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
  }
});
