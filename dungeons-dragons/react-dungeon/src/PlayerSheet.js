import React from "react";

import './PlayerSheet.css';

class PlayerSheet extends React.Component {

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
	    const dataKey = contract.methods["playerSheet"].cacheCall();
	    this.setState({ dataKey });
	  }

	getPlayerSheetValues() {
	    setTimeout(
	    	() => {
				const { DungeonsAndDragons } = this.props.drizzleState.contracts;
	    		const playerSheet = DungeonsAndDragons.playerSheet[this.state.dataKey];
	    	},
	    	300
	    )
	};

	render() {
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts;
	    const playerSheet = DungeonsAndDragons.playerSheet[this.state.dataKey];
	    return (
	    	<div>
		    	<form className="charsheet" onSubmit={this.handleSubmit}>
				  <header>
				    <section className="charname">
				      <label htmlFor="charname">Character Name</label>
				      <input id="charName" value={this.state.charName} onChange={this.handleChange} name="charname" placeholder="Thoradin Fireforge" />
				      <div>{playerSheet && playerSheet.value.name}</div>
				    </section>
				    <section className="misc">
				      <ul>
				        <li>
				          <label htmlFor="classlevel">Class</label>
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
						  <div>{playerSheet && playerSheet.value.class}</div>
				        </li>
				        <li>
				          <label htmlFor="level">Level</label>
				          <input id="level" name="level" value={this.state.level} onChange={this.handleChange} placeholder="1" />
				          <div>{playerSheet && playerSheet.value.level}</div>
				        </li>
				        <li>
				          <label htmlFor="playername">Player Name</label>
				          <input id="playerName" value={this.state.playerName} onChange={this.handleChange} name="playername" placeholder="Player McPlayerface" />
				          <div>{playerSheet && playerSheet.value.player}</div>
				        </li>
				        <li>
				          <label htmlFor="race">Race</label>
				          <select id="race" value={this.state.race} onChange={this.handleChange}>
							<option value="Half Elf">Half Elf</option>
							<option value="Half Orc">Half Orc</option>
							<option value="Human">Human</option>
							<option value="Dwarf">Dwarf</option>
							<option value="Gnome">Gnome</option>
							<option value="Dragonborn">Dragonborn</option>
						  </select>
						  <div>{playerSheet && playerSheet.value.race}</div>
				        </li>
				        <li>
				          <label htmlFor="gender">Gender</label>
				          <select id="gender" value={this.state.gender} onChange={this.handleChange}>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						  </select>
						  <div>{playerSheet && playerSheet.value.gender}</div>
				        </li>
				        <li>
				          <label htmlFor="age">Age</label>
				          <input id="age" type="text" value={this.state.age} onChange={this.handleChange} ame="age" placeholder="10" />
				          <div>{playerSheet && playerSheet.value.age}</div>
				        </li>
				      </ul>
				    </section>
				  </header>
				  <main>
				    <section>
				      <section className="attributes">
				        <div className="scores">
				          <ul>
				            <li>
				              <div className="score">
				                <label htmlFor="Strengthscore">Strength</label><input name="Strengthscore" placeholder="10" />
				              </div>
				              <div className="modifier">
				                <input name="Strengthmod" placeholder="+0" />
				              </div>
				            </li>
				            <li>
				              <div className="score">
				                <label htmlFor="Dexterityscore">Dexterity</label><input name="Dexterityscore" placeholder="10" />
				              </div>
				              <div className="modifier">
				                <input name="Dexteritymod" placeholder="+0" />
				              </div>
				            </li>
				            <li>
				              <div className="score">
				                <label htmlFor="Constitutionscore">Constitution</label><input name="Constitutionscore" placeholder="10" />
				              </div>
				              <div className="modifier">
				                <input name="Constitutionmod" placeholder="+0" />
				              </div>
				            </li>
				            <li>
				              <div className="score">
				                <label htmlFor="Wisdomscore">Wisdom</label><input name="Wisdomscore" placeholder="10" />
				              </div>
				              <div className="modifier">
				                <input name="Wisdommod" placeholder="+0" />
				              </div>
				            </li>
				            <li>
				              <div className="score">
				                <label htmlFor="Intelligencescore">Intelligence</label><input name="Intelligencescore" placeholder="10" />
				              </div>
				              <div className="modifier">
				                <input name="Intelligencemod" placeholder="+0" />
				              </div>
				            </li>
				            <li>
				              <div className="score">
				                <label htmlFor="Charismascore">Charisma</label><input name="Charismascore" placeholder="10" />
				              </div>
				              <div className="modifier">
				                <input name="Charismamod" placeholder="+0" />
				              </div>
				            </li>
				          </ul>
				        </div>
				        <div className="attr-applications">
				          <div className="inspiration box">
				            <div className="label-container">
				              <label htmlFor="inspiration">Inspiration</label>
				            </div>
				            <input name="inspiration" type="checkbox" />
				          </div>
				          <div className="proficiencybonus box">
				            <div className="label-container">
				              <label htmlFor="proficiencybonus">Proficiency Bonus</label>
				            </div>
				            <input name="proficiencybonus" placeholder="+2" />
				          </div>
				          <div className="saves list-section box">
				            <ul>
				              <li>
				                <label htmlFor="Strength-save">Strength</label><input name="Strength-save" placeholder="+0" type="text" /><input name="Strength-save-prof" type="checkbox" />
				              </li>
				              <li>
				                <label htmlFor="Dexterity-save">Dexterity</label><input name="Dexterity-save" placeholder="+0" type="text" /><input name="Dexterity-save-prof" type="checkbox" />
				              </li>
				              <li>
				                <label htmlFor="Constitution-save">Constitution</label><input name="Constitution-save" placeholder="+0" type="text" /><input name="Constitution-save-prof" type="checkbox" />
				              </li>
				              <li>
				                <label htmlFor="Wisdom-save">Wisdom</label><input name="Wisdom-save" placeholder="+0" type="text" /><input name="Wisdom-save-prof" type="checkbox" />
				              </li>
				              <li>
				                <label htmlFor="Intelligence-save">Intelligence</label><input name="Intelligence-save" placeholder="+0" type="text" /><input name="Intelligence-save-prof" type="checkbox" />
				              </li>
				              <li>
				                <label htmlFor="Charisma-save">Charisma</label><input name="Charisma-save" placeholder="+0" type="text" /><input name="Charisma-save-prof" type="checkbox" />
				              </li>
				            </ul>
				            <div className="label">
				              Saving Throws
				            </div>
				          </div>
				        </div>
				      </section>
				      <div className="otherprofs box textblock">
				        <label htmlFor="otherprofs">Other Proficiencies and Languages</label><textarea name="otherprofs"></textarea>
				      </div>
				    </section>
				    <section>
				      <section className="combat">
				        <div className="armorclass">
				          <div>
				            <label htmlFor="ac">Armor Class</label><input name="ac" placeholder="10" type="text" />
				          </div>
				        </div>
				        <div className="initiative">
				          <div>
				            <label htmlFor="initiative">Initiative</label><input name="initiative" placeholder="+0" type="text" />
				          </div>
				        </div>
				        <div className="speed">
				          <div>
				            <label htmlFor="speed">Speed</label><input name="speed" placeholder="30" type="text" />
				          </div>
				        </div>
				        <div className="hp">
				          <div className="regular">
				            <div className="max">
				              <label htmlFor="maxhp">Hit Point Maximum</label><input name="maxhp" placeholder="10" type="text" />
				            </div>
				            <div className="current">
				              <label htmlFor="currenthp">Current Hit Points</label><input name="currenthp" type="text" />
				            </div>
				          </div>
				          <div className="temporary">
				            <label htmlFor="temphp">Temporary Hit Points</label><input name="temphp" type="text" />
				          </div>
				        </div>
				        <div className="hitdice">
				          <div>
				            <div className="total">
				              <label htmlFor="totalhd">Total</label><input name="totalhd" placeholder="2d10" type="text" />
				            </div>
				            <div className="remaining">
				              <label htmlFor="remaininghd">Hit Dice</label><input name="remaininghd" type="text" />
				            </div>
				          </div>
				        </div>
				        <div className="deathsaves">
				          <div>
				            <div className="label">
				              <label>Death Saves</label>
				            </div>
				            <div className="marks">
				              <div className="deathsuccesses">
				                <label>Successes</label>
				                <div className="bubbles">
				                  <input name="deathsuccess1" type="checkbox" />
				                  <input name="deathsuccess2" type="checkbox" />
				                  <input name="deathsuccess3" type="checkbox" />
				                </div>
				              </div>
				              <div className="deathfails">
				                <label>Failures</label>
				                <div className="bubbles">
				                  <input name="deathfail1" type="checkbox" />
				                  <input name="deathfail2" type="checkbox" />
				                  <input name="deathfail3" type="checkbox" />
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
				      </section>
				      <section className="equipment">
				        <div>
				          <label>Equipment</label>
				          <div className="money">
				            <ul>
				              <li>
				                <label htmlFor="cp">cp</label><input name="cp" />
				              </li>
				              <li>
				                <label htmlFor="sp">sp</label><input name="sp" />
				              </li>
				              <li>
				                <label htmlFor="ep">ep</label><input name="ep" />
				              </li>
				              <li>
				                <label htmlFor="gp">gp</label><input name="gp" />
				              </li>
				              <li>
				                <label htmlFor="pp">pp</label><input name="pp" />
				              </li>
				            </ul>
				          </div>
				          <textarea placeholder="Equipment list here"></textarea>
				        </div>
				      </section>
				    </section>
				    <section>
				      <section className="flavor">
				        <div className="personality">
				          <label htmlFor="personality">Personality</label><textarea name="personality"></textarea>
				        </div>
				        <div className="ideals">
				          <label htmlFor="ideals">Ideals</label><textarea name="ideals"></textarea>
				        </div>
				        <div className="bonds">
				          <label htmlFor="bonds">Bonds</label><textarea name="bonds"></textarea>
				        </div>
				        <div className="flaws">
				          <label htmlFor="flaws">Flaws</label><textarea name="flaws"></textarea>
				        </div>
				      </section>
				      <section className="features">
				        <div>
				          <label htmlFor="features">Features & Traits</label><textarea name="features"></textarea>
				        </div>
				      </section>
				    </section>
				  </main>
				  <input className="submit-button" type="submit" value="Submit" />
				</form>
				<p>Txn Status:</p>
	 	    	<div>{this.getTxStatus()}</div>
			</div>
	    );
	}
	
}

export default PlayerSheet;