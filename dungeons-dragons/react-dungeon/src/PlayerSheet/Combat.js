import React from "react";

import './Combat.css';

class Stats extends React.Component {

	state = { 
			combatStatsKey: null,
			stackId: null,
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
	    const combatStatsKey = contract.methods["playerCombatStats"].cacheCall();
	    this.setState({combatStatsKey})
	  }

	render() {
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts;
	    const combatStats = DungeonsAndDragons.playerCombatStats[this.state.combatStatsKey];
	    return (
	    	<div>
		    	<div className="charsheet-combat">
				  <main>
				    <section>
				      <section className="combat">
				        <div className="armorclass">
				          <div>
				            <label htmlFor="ac">Armor Class</label>
				            <div name="ac">
					            {combatStats && combatStats.value.armorClass}
					            {!combatStats && "0"}
				            </div>
				          </div>
				        </div>
				        <div className="initiative">
				          <div>
				            <label htmlFor="initiative">Initiative</label>
				            <div name="initiative">
					            {combatStats && combatStats.value.initiative}
					            {!combatStats && "+0"}
				            </div>
				          </div>
				        </div>
				        <div className="speed">
				          <div>
				            <label htmlFor="speed">Speed</label>
				            <div name="speed">
				            	{"30"}
				            </div>
				          </div>
				        </div>
				        <div className="hp">
				          <div className="regular">
				            <div className="max">
				              <label htmlFor="maxhp">Hit Point Maximum</label>
				              <div name="maxhp">
				              	{combatStats && combatStats.value.totalHitPoints}
				              </div>
				            </div>
				            <div className="current">
				              <label htmlFor="currenthp">Current Hit Points</label>
				              <div name="currenthp">
				              	{combatStats && combatStats.value.currentHitPoints}
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="hitdice">
				          <div>
				            <div className="remaining">
				              <label htmlFor="remaininghd">Hit Dice</label>
				              <div name="remaininghd">
				              	{combatStats && `1d${combatStats.value.hitDice}`}
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