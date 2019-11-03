import React from "react";

import './Base.css';

class Base extends React.Component {

	state = { 
			dataKey: null,
			stackId: null,
			charName: '',
			prevcharName: '',
			playerName: '',
			class: '',
			level: '',
			race: '',
			age: '',
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
		if(this.state.class === '') this.setState({class: 'Druid'});
		if(this.state.race === '') this.setState({race: 'Half Elf'});
		if(this.state.gender === '') this.setState({gender: 'Male'});
		const stackId = contract.methods["setBasicCharacterSheet"].cacheSend(this.state.charName, this.state.playerName, this.state.class, this.state.level,
		 this.state.race, this.state.age, this.state.gender, {
		  from: drizzleState.accounts[0]
		});
		this.setState({ stackId });
		event.preventDefault();
		this.props.goToSecond(2)
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
	    const dataKey = contract.methods["playerSheet"].cacheCall();
	    this.setState({ dataKey });
	}

	isHidden = () => {
		return this.props.currentStep !== 1
	}

	render() {
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts;
	    const playerSheet = DungeonsAndDragons.playerSheet[this.state.dataKey];
	    return (
	    	<div>
		    	<form className="charsheet" onSubmit={this.handleSubmit}>
				  <header>
				    <section className="charname">
				      <label htmlFor="charname">Character Name</label>
				      <input id="charName" value={this.state.charName} onChange={this.handleChange} name="charname" placeholder="Thoradin Fireforge" hidden={this.isHidden()} />
				      <div>{playerSheet && this.isHidden() && playerSheet.value.name}</div>
				    </section>
				    <section className="misc">
				      <ul>
				        <li>
				          <label htmlFor="classlevel">Class</label>
				          <select id="class" value={this.state.class} onChange={this.handleChange} hidden={this.isHidden()}>
							<option value="Druid">Druid</option>
							<option value="Rogue">Rogue</option>
							<option value="Warlock">Warlock</option>
							<option value="Cleric">Cleric</option>
							<option value="Paladin">Paladin</option>
							<option value="Wizard">Wizard</option>
							<option value="Fighter">Figher</option>
							<option value="Barbarian">Barbarian</option>
						  </select>
						  <div>{playerSheet && this.isHidden() && playerSheet.value.class}</div>
				        </li>
				        <li>
				          <label htmlFor="level">Level</label>
				          <input id="level" name="level" value={this.state.level} onChange={this.handleChange} placeholder="1" hidden={this.isHidden()} />
				          <div>{playerSheet && this.isHidden() && playerSheet.value.level}</div>
				        </li>
				        <li>
				          <label htmlFor="playername">Player Name</label>
				          <input id="playerName" value={this.state.playerName} onChange={this.handleChange} name="playername" placeholder="Player McPlayerface" hidden={this.isHidden()} />
				          <div>{playerSheet && this.isHidden() && playerSheet.value.player}</div>
				        </li>
				        <li>
				          <label htmlFor="race">Race</label>
				          <select id="race" value={this.state.race} onChange={this.handleChange} hidden={this.isHidden()}>
							<option value="Half Elf">Half Elf</option>
							<option value="Half Orc">Half Orc</option>
							<option value="Human">Human</option>
							<option value="Dwarf">Dwarf</option>
							<option value="Gnome">Gnome</option>
							<option value="Dragonborn">Dragonborn</option>
						  </select>
						  <div>{playerSheet && this.isHidden() && playerSheet.value.race}</div>
				        </li>
				        <li>
				          <label htmlFor="gender">Gender</label>
				          <select id="gender" value={this.state.gender} onChange={this.handleChange} hidden={this.isHidden()}>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						  </select>
						  <div>{playerSheet && this.isHidden() && playerSheet.value.gender}</div>
				        </li>
				        <li>
				          <label htmlFor="age">Age</label>
				          <input id="age" type="text" value={this.state.age} onChange={this.handleChange} ame="age" placeholder="10" hidden={this.isHidden()} />
				          <div>{playerSheet && this.isHidden() && playerSheet.value.age}</div>
				        </li>
				      </ul>
				    </section>
				  </header>
				  {this.props.currentStep === 1 &&
				  	<input className="submit-button" type="submit" value="Submit" />
				  }
				</form>
				<p>Txn Status:</p>
	 	    	<div>{this.getTxStatus()}</div>
			</div>
	    );
	}
	
}

export default Base;