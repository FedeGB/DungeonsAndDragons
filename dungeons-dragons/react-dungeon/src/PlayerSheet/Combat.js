import React from "react";

import './Combat.css';

class Stats extends React.Component {

	state = { 
			dataKey: null,
			stackId: null,
			// statsAssigned: {
		 //    	strength: 0,
		 //    	dexterity: 0,
		 //    	constitution: 0,
		 //    	wisdom: 0,
		 //    	intelligence: 0,
		 //    	charisma: 0,
			// },
			// submitted: false,
	}

	constructor(props) {
		super(props);
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.DungeonsAndDragons;
		// const stackId = contract.methods["setStatsCharacterSheet"].cacheSend(
		// 	this.state.statsAssigned.strength,
		// 	this.state.statsAssigned.dexterity,
		// 	this.state.statsAssigned.constitution,
		// 	this.state.statsAssigned.wisdom,
		// 	this.state.statsAssigned.intelligence,
		// 	this.state.statsAssigned.charisma, 
		// 	{
		// 	  from: drizzleState.accounts[0]
		// 	}
		// );
		// this.setState({ stackId });
		event.preventDefault();
	}

	getTxStatus = () => {
		const { transactions, transactionStack } = this.props.drizzleState;
		const txHash = transactionStack[this.state.stackId];
		if (!txHash) return null;
		if(!transactions[txHash]) return null;
		if(transactions[txHash].status === 'success') {
			this.props.goToFourth(4)
		}
		return `Transaction status: ${transactions[txHash].status}`;
	}

	componentDidMount() {
	    const { drizzle } = this.props;
	    const contract = drizzle.contracts.DungeonsAndDragons;
	    // const dataKey = contract.methods["playerSheetStats"].cacheCall();
	    // this.setState({dataKey})
	  }

	render() {
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts;
	    // const playerSheetStats = DungeonsAndDragons.playerSheetStats[this.state.dataKey];
	    return (
	    	<div>
		    	<div className="charsheet-combat">
				  <main>
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
				  {this.props.currentStep === 3 &&
				  	<input className="submit-button" type="submit" value="Submit" />
				  }
				</div>
				{this.props.currentStep === 3 &&
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