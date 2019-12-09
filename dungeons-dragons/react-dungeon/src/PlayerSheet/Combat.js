import React from "react";

import './Combat.css';

class Stats extends React.Component {

	state = { 
			combatStatsKey: null,
			stackId: null,
	}

	componentDidMount() {
	    const { drizzle } = this.props;
	    const contract = drizzle.contracts.DungeonsAndDragons;
	    const combatStatsKey = contract.methods["playerCombatStats"].cacheCall();
	    this.setState({combatStatsKey})
	  }

	nextSheet = () => {
		this.props.goToFourth(4)
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
				    </section>
					{this.props.currentStep === 3 &&
						<div className="buttonContainer">
							<button className="next-button" type="button" onClick={this.nextSheet}>
								Create Opponent
							</button>
						</div>
					}
				  </main>
				</div>
			</div>
	    );
	}
	
}

export default Stats;