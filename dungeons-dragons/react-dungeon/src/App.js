import React, { Component } from 'react';
import './App.css';
import PlayerSheet from './PlayerSheet'
class App extends Component {

  state = {
    loading: true,
    drizzleState: null,
    step: 'init'
   };

  componentDidMount() {
    const { drizzle } = this.props;
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  handleGoTo = (stepTo) => {
    this.setState({step: stepTo})
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    console.log(this.state.drizzleState)
    return (
      <div className="App">
      {this.state.step === 'init' &&
        <div>
          <div className="dnd">Dungeons & Dragons</div>
          <button className="continue-button" onClick={() => {this.setState({step:'sheet-first'})}}>Continue</button>
        </div>
      }
      {this.state.step === 'sheet-first' &&
          <PlayerSheet
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            goToSecond={this.handleGoTo}
          />
      }
      {this.state.step === 'sheet-second' &&
        <div>Sheet 2</div>
      }
      </div>
    );
  }
}


export default App;