import React from "react"

import './Stats.css'

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
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		const { drizzle, drizzleState } = this.props
		const contract = drizzle.contracts.DungeonsAndDragons
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
		)
		this.setState({ stackId })
		event.preventDefault()
	}

	getTxStatus = () => {
		const { transactions, transactionStack } = this.props.drizzleState
		const txHash = transactionStack[this.state.stackId]
		if (!txHash) return 'waiting'
		if(!transactions[txHash]) return 'waiting'
		if(transactions[txHash].status === 'success') {
			this.setState({submitted: true})
			this.props.goToThird(3)
		}
		return transactions[txHash].status
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
	    const { drizzle } = this.props
	    const contract = drizzle.contracts.DungeonsAndDragons
	    const dataKey = contract.methods["playerSheetStats"].cacheCall()
	    this.setState({dataKey})
	  }

	render() {
	    const { DungeonsAndDragons } = this.props.drizzleState.contracts
	    const playerSheetStats = DungeonsAndDragons.playerSheetStats[this.state.dataKey]
	    return (
	    	<div>
				{!this.state.submitted &&
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
					    </section>
					  </main>
					  {this.props.currentStep === 2 &&
					  	<input className="submit-button" type="submit" value="Submit" />
					  }
					</form>
				}
				{this.props.currentStep === 2 &&
					<div>
			 	    	<div>{`Transaction status: ${this.getTxStatus()}`}</div>
		 	    	</div>
	 	    	}
			</div>
	    )
	}
	
}

export default Stats