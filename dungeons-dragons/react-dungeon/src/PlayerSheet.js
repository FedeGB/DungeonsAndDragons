import React from "react";

import './PlayerSheet.css';

class PlayerSheet extends React.Component {

	state = { 
			dataKey: null,
			stackId: null,
			charName: '',
			playerName: '',
			class: '',
			level: 0,
			race: '',
			age: 0,
			gender: ''
	};

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
    	this.setState({[event.target.id]: event.target.value});
	}

	handleSubmit(event) {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.DungeonsAndDragons;
		// let drizzle know we want to call the `add` method with `value1 and value2`
		const stackId = contract.methods["setBasicCharacterSheet"].cacheSend(this.state.charName, this.state.playerName, this.state.class, this.state.level,
		 this.state.race, this.state.age, this.state.gender, {
		  from: drizzleState.accounts[0]
		});
		console.log(drizzleState.accounts);
		this.setState({ stackId });
		event.preventDefault();
	}

	getTxStatus = () => {
		const { transactions, transactionStack } = this.props.drizzleState;
		const txHash = transactionStack[this.state.stackId];
		if (!txHash) return null;
		if(!transactions[txHash]) return null;
		return `Transaction status: ${transactions[txHash].status}`;
	};

	componentDidMount() {
	    const { drizzle } = this.props;
	    const contract = drizzle.contracts.DungeonsAndDragons;
	    var dataKey = contract.methods["playerSheet"].cacheCall();
	    this.setState({ dataKey });
	  }

	render() {
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts;
	    const playerSheet = DungeonsAndDragons.playerSheet[this.state.dataKey];
	    return ( 
	    <div>
	    	<p>Player Sheet:</p>
	    	<p>Name: {playerSheet && playerSheet.value.name}</p>
	    	<p>Player: {playerSheet && playerSheet.value.player}</p>
	    	<p>Class: {playerSheet && playerSheet.value.class}</p>
	    	<p>Level: {playerSheet && playerSheet.value.level}</p>
	    	<p>Race: {playerSheet && playerSheet.value.race}</p>
	    	<p>Age: {playerSheet && playerSheet.value.age}</p>
	    	<p>Gender: {playerSheet && playerSheet.value.gender}</p>
	    
		    <form id="basic-player-info" onSubmit={this.handleSubmit}>
	        	<div>
	          		<div>Character Name</div>
	          		<input id="charName" type="text" value={this.state.charName} onChange={this.handleChange} />
	          		<div>Player Name</div>
	          		<input id="playerName" type="text" value={this.state.playerName} onChange={this.handleChange} />
	          		<div>Class</div>
					<select id="class" value={this.state.class} onChange={this.handleChange}>
						<option value="Druid">Druid</option>
						<option value="Rogue">Rogue</option>
						<option value="Warlock">Warlock</option>
						<option value="Cleric">Cleric</option>
						<option value="Paladin">Paladin</option>
						<option value="Wizard">Wizard</option>
						<option value="Fighter">Figher</option>
						<option value="Barbarian">Barbarian</option>
					</select>
	          		<div>Level</div>
	          		<input id="level" type="text" value={this.state.level} onChange={this.handleChange} />
	          		<div>Race</div>
	          		<select id="race" value={this.state.race} onChange={this.handleChange}>
						<option value="Half Elf">Half Elf</option>
						<option value="Half Orc">Half Orc</option>
						<option value="Human">Human</option>
						<option value="Dwarf">Dwarf</option>
						<option value="Gnome">Gnome</option>
						<option value="Dragonborn">Dragonborn</option>
					</select>
	          		<div>Age</div>
	          		<input id="age" type="text" value={this.state.age} onChange={this.handleChange} />
	          		<div>Gender</div>
	          		<select id="gender" value={this.state.gender} onChange={this.handleChange}>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
	        	</div>
	        	<input class="submit-button" type="submit" value="Submit" />
	 	    </form>
	 	    <p>Txn Status:</p>
	 	    <div>{this.getTxStatus()}</div>
	    </div>
	    );
	}
	
}

export default PlayerSheet;