import React from "react";

import './Initialization.css';

class Initialization extends React.Component {

	handleClick(event) {
	}

	render() {
		return(
			<div>
				<a className="dnd">Dungeons & Dragons</a>
				<input className="continue-button" value="Continue" onClick={this.handleClick} />
			</div>
		)
	}
}


export default Initialization;