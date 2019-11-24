import React from "react";

import './Stats.css';

class Stats extends React.Component {

	state = { 
			dataKey: null,
			stackId: null,
			statsAssigned: {
		    	strength: 0,
		    	dexterity: 0,
		    	constitution: 0,
		    	wisdom: 0,
		    	intelligence: 0,
		    	charisma: 0,
			},
			submitted: false,
	}

	constructor(props) {
		super(props);
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.DungeonsAndDragons;
		const stackId = contract.methods["setStatsCharacterSheet"].cacheSend(
			this.state.statsAssigned.strength,
			this.state.statsAssigned.dexterity,
			this.state.statsAssigned.constitution,
			this.state.statsAssigned.wisdom,
			this.state.statsAssigned.intelligence,
			this.state.statsAssigned.charisma, 
			{
			  from: drizzleState.accounts[0]
			}
		);
		this.setState({ stackId });
		event.preventDefault();
	}

	getTxStatus = () => {
		const { transactions, transactionStack } = this.props.drizzleState;
		const txHash = transactionStack[this.state.stackId];
		if (!txHash) return null;
		if(!transactions[txHash]) return null;
		if(transactions[txHash].status === 'success') {
			this.setState({submitted: true})
			this.props.goToThird(3)
		}
		return `Transaction status: ${transactions[txHash].status}`;
	}

	rollD6 = () => {
		return Math.floor(Math.random() * 6) + 1
	}

	rollForStat = () => {
		let results = []
		for (let i = 0; i < 4; i++) {
			results.push(this.rollD6())
		}
		results.sort()
		results.shift()
		return results.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
	}

	assignStat = (stat) => {
		const statRolled = this.rollForStat()
		let assign = this.state.statsAssigned
		assign[stat] = statRolled
		this.setState({statsAssigned: assign})
	}

	allStatsReady = () => {
		let statsSet = 0
		const allStats = this.state.statsAssigned
		for(let stat in allStats) {
			statsSet += (allStats[stat] > 0) ? 1 : 0
		}
		return Object.keys(allStats).length === statsSet
	}

	createStatChooser = () => {
		let selectors = []
		const stats = ["strength", "dexterity", "constitution", "wisdom", "intelligence", "charisma"]
		stats.forEach((stat, index) => {
			selectors.push(
			<div>
				<label htmlFor={stat}>{stat.toUpperCase()}</label>
				{this.state.statsAssigned[stat] === 0 &&
					<input className="roll-button" type="submit" value={`Roll ${stat.toUpperCase()}`} onClick={() => { this.assignStat(stat) }} />
				}
				{this.state.statsAssigned[stat]}
			</div>
			)
		})
		return selectors
	}

	componentDidMount() {
	    const { drizzle } = this.props;
	    const contract = drizzle.contracts.DungeonsAndDragons;
	    const dataKey = contract.methods["playerSheetStats"].cacheCall();
	    this.setState({dataKey})
	  }

	render() {
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts;
	    const playerSheetStats = DungeonsAndDragons.playerSheetStats[this.state.dataKey];
	    return (
	    	<div>
				{!this.allStatsReady() &&
					this.createStatChooser()
				}
				{this.allStatsReady() && !this.state.submitted &&
					<input className="submit-button" type="submit" value="Submit" onClick={this.handleSubmit} />
				}
		    	{this.state.submitted &&
			    	<form className="charsheet-stats" onSubmit={this.handleSubmit}>
					  <main>
					    <section>
					      <section className="attributes">
					        <div className="scores">
					          <ul>
					            <li>
					              <div className="score">
					                <label htmlFor="Strengthscore">Strength</label>
					                <div>{playerSheetStats && playerSheetStats.value.strength}</div>
					              </div>
					              <div className="modifier">
					                <div>{playerSheetStats && playerSheetStats.value.strengthModifier}</div>
					              </div>
					            </li>
					            <li>
					              <div className="score">
					                <label htmlFor="Dexterityscore">Dexterity</label>
					                <div>{playerSheetStats && playerSheetStats.value.dexterity}</div>
					              </div>
					              <div className="modifier">
					                <div>{playerSheetStats && playerSheetStats.value.dexterityModifier}</div>
					              </div>
					            </li>
					            <li>
					              <div className="score">
					                <label htmlFor="Constitutionscore">Constitution</label>
					                <div>{playerSheetStats && playerSheetStats.value.constitution}</div>
					              </div>
					              <div className="modifier">
					                <div>{playerSheetStats && playerSheetStats.value.constitutionModifier}</div>
					              </div>
					            </li>
					            <li>
					              <div className="score">
					                <label htmlFor="Wisdomscore">Wisdom</label>
					                <div>{playerSheetStats && playerSheetStats.value.wisdom}</div>
					              </div>
					              <div className="modifier">
					                <div>{playerSheetStats && playerSheetStats.value.wisdomModifier}</div>
					              </div>
					            </li>
					            <li>
					              <div className="score">
					                <label htmlFor="Intelligencescore">Intelligence</label>
					                <div>{playerSheetStats && playerSheetStats.value.intelligence}</div>
					              </div>
					              <div className="modifier">
					                <div>{playerSheetStats && playerSheetStats.value.intelligenceModifier}</div>
					              </div>
					            </li>
					            <li>
					              <div className="score">
					                <label htmlFor="Charismascore">Charisma</label>
					                <div>{playerSheetStats && playerSheetStats.value.charisma}</div>
					              </div>
					              <div className="modifier">
					                <div>{playerSheetStats && playerSheetStats.value.charismaModifier}</div>
					              </div>
					            </li>
					          </ul>
					        </div>
					        <div className="attr-applications">
					          <div className="saves list-section box">
					            <ul>
					              <li>
					                <label htmlFor="Constitution-save">Fortitude</label>
					                <input name="Constitution-save" placeholder="+0" type="text" />
					              </li>
					              <li>
					                <label htmlFor="Dexterity-save">Reflex</label>
					                <input name="Dexterity-save" placeholder="+0" type="text" />
					              </li>
					              <li>
					                <label htmlFor="Wisdom-save">Willpower</label>
					                <input name="Wisdom-save" placeholder="+0" type="text" />
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
					  {this.props.currentStep === 2 &&
					  	<input className="submit-button" type="submit" value="Submit" />
					  }
					</form>
				}
				{this.props.currentStep === 2 &&
					<div>
						<p>Txn Status:</p>
			 	    	<div>{`Transaction status: ${this.getTxStatus()}`}</div>
		 	    	</div>
	 	    	}
			</div>
	    );
	}
	
}

export default Stats;