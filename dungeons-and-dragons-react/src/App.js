import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import BasicCharacterData from './components/BasicCharacterData.jsx'

class App extends React.Component {

	constructor(props) {
		super(props);

		const EthContract = window.web3.eth.contract();
		this.state = {
			ContractInstance: EthContract.at('10')
		}
	}

	render() {
	  return (
	    <div>
	      <BasicCharacterData />
	    </div>
  );
	}
}

export default App;
