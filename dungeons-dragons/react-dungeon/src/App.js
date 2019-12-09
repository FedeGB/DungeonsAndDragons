import React, { Component } from 'react'
import './App.css'
import Base from './PlayerSheet/Base'
import Stats from './PlayerSheet/Stats'
import Combat from './PlayerSheet/Combat'

class App extends Component {

  state = {
    loading: true,
    drizzleState: null,
    step: 0
   }

  componentDidMount() {
    const { drizzle } = this.props
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState()
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState })
      }
    })
  }

  compomentWillUnmount() {
    this.unsubscribe()
  }

  handleGoTo = (stepTo) => {
    this.setState({step: stepTo})
  }

  render() {
    if (this.state.loading) return "Loading Drizzle..."
    return (
      <div className="App">
      {this.state.step === 0 &&
        <div>
          <div className="dnd">Dungeons & Dragons</div>
          <button className="continue-button" onClick={() => {this.setState({step:1})}}>Start Sheet</button>
        </div>
      }
      {this.state.step >= 1 &&
        <Base
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          goToSecond={this.handleGoTo}
          currentStep={this.state.step}
        />
      }
      {this.state.step >= 2 &&
        <Stats
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          goToThird={this.handleGoTo}
          currentStep={this.state.step}
        />
      }
      {this.state.step >= 3 &&
        <Combat
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          nextSheet={this.handleGoTo}
          currentStep={this.state.step}
        />
        }
      </div>
    )
  }
}


export default App