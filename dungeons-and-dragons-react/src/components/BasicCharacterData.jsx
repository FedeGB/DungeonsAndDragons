import React from 'react';
import './BasicCharacterData.css';

class BasicCharacterData extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      charName: '',
      playerName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    console.log(`A Character Name: ${this.state.charName}`);
    console.log(`A Player Name: ${this.state.playerName}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input id="charName" type="text" value={this.state.charName} onChange={this.handleChange} />
          <div>Character Name</div>
        </div>
        <div>
          <input id="playerName" type="text" value={this.state.playerName} onChange={this.handleChange} />
          <div>Player Name</div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default BasicCharacterData