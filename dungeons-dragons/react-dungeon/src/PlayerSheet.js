import React from "react";

class PlayerSheet extends React.Component {

	state = { 
			dataKey: null,
			stackId: null,
			charName: '',
			playerName: '',
			class: '',
			level: 0,
			race: '',
			size: 0,
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
		 this.state.race, this.state.size, this.state.age, this.state.gender, {
		  from: drizzleState.accounts[0]
		});
		console.log(drizzleState.accounts);
		// save the `stackId` for later reference
		this.setState({ stackId });
		event.preventDefault();
	}

	getTxStatus = () => {
		// get the transaction states from the drizzle state
		const { transactions, transactionStack } = this.props.drizzleState;
		// get the transaction hash using our saved `stackId`
		const txHash = transactionStack[this.state.stackId];
		// if transaction hash does not exist, don't display anything
		if (!txHash) return null;
		// otherwise, return the transaction status
		if(!transactions[txHash]) return null;
		return `Transaction status: ${transactions[txHash].status}`;
	};

	componentDidMount() {
	    const { drizzle } = this.props;
	    const contract = drizzle.contracts.DungeonsAndDragons;
		// let drizzle know we want to watch 'sum'
	    var dataKey = contract.methods["playerSheet"].cacheCall();
		// save the `dataKey` to local component state for later reference
	    this.setState({ dataKey });
	  }

	render() {
		// get the contract state from drizzleState
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts;
		// using the saved `dataKey`, get the variable we're interested in
	    const playerSheet = DungeonsAndDragons.playerSheet[this.state.dataKey];
		// if it exists, then we display its value
	    return ( 
	    <div>
	    	<p>Player Sheet:</p>
	    	<p>Name: {playerSheet && playerSheet.value.name}</p>
	    	<p>Player: {playerSheet && playerSheet.value.player}</p>
	    	<p>Class: {playerSheet && playerSheet.value.class}</p>
	    	<p>Level: {playerSheet && playerSheet.value.level}</p>
	    	<p>Race: {playerSheet && playerSheet.value.race}</p>
	    	<p>Size: {playerSheet && playerSheet.value.size}</p>
	    	<p>Age: {playerSheet && playerSheet.value.age}</p>
	    	<p>Gender: {playerSheet && playerSheet.value.gender}</p>
	    
		    <form onSubmit={this.handleSubmit}>
	        	<div>
	          		<div>Character Name</div>
	          		<input id="charName" type="text" value={this.state.charName} onChange={this.handleChange} />
	          		<div>Player Name</div>
	          		<input id="playerName" type="text" value={this.state.playerName} onChange={this.handleChange} />
	          		<div>Class</div>
	          		<input id="class" type="text" value={this.state.class} onChange={this.handleChange} />
	          		<div>Level</div>
	          		<input id="level" type="text" value={this.state.level} onChange={this.handleChange} />
	          		<div>Race</div>
	          		<input id="race" type="text" value={this.state.race} onChange={this.handleChange} />
	          		<div>Size</div>
	          		<input id="size" type="text" value={this.state.size} onChange={this.handleChange} />
	          		<div>Age</div>
	          		<input id="age" type="text" value={this.state.age} onChange={this.handleChange} />
	          		<div>Gender</div>
	          		<input id="gender" type="text" value={this.state.gender} onChange={this.handleChange} />
	        	</div>
	        	<input type="submit" value="Submit" />
	 	    </form>
	 	    <p>Txn Status:</p>
	 	    <div>{this.getTxStatus()}</div>
	    </div>
	    );
	}
	
}

export default PlayerSheet;