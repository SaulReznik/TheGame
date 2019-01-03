import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native';
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
      player: 0,
      theBot: 1,
      result: 1,
      clicks: 0,
    }
  }

  showresult() {
      if (this.state.player >= 1 && this.state.player <= 10) {

    //arajin kliki jamanak uxaki player-y u bot-y gumaruma irar,2rdic sksac arden resultnela gumarum
    if (this.state.clicks <= 1) {
        this.setState({result: (this.state.player + this.state.theBot + 1)})
    } else if (this.state.clicks > 1) {
      this.setState({result: (this.state.result + this.state.player + this.state.theBot)})
      }

    } else {
      //console.log(false);
    }
};

    clickCount () {
      this.setState({clicks: +1})
    };
    //bot-um taqnvaca es xaxi gaxtniqy ;)
    winningStrategy () {

      this.setState({theBot: (11 - this.state.player)})

    }

  render() {
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
           keyboardType="numeric"
           style={styles.textInput}
           value={this.state.player}/>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          value={this.state.result}/>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          value={this.state.theBot}/>
      <Button
        id='count'
        title='Count'
        value='Count'
        onPress={ () => this.showresult(), () => this.clickCount(), () => this.winningStrategy()} />
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
  textInput: {
    height: 70,
    width: 250,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
