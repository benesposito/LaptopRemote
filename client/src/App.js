import React from 'react';
import './App.css';
import hostname from './ip.js';
import RemoteButton from './RemoteButton';

class App extends React.Component {
	state = {
		players: [],
		player: undefined,
		volume: 10
	}
	
	constructor(props) {
		super(props);

		fetch(hostname + '/api/getplayers').then(res => {
			res.json().then(players => {
				console.log(players);
				this.setState({
					players: players,
					player: players[0]
				});
			});
		});

		fetch(hostname + '/api/getvolume').then(res => {
			res.json().then(volume => {
				this.setState({
					volume: volume
				});
			})
		});

		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.handleSliderChange = this.handleSliderChange.bind(this);
	}

	handleDropdownChange(e) {
		console.log(e.target.value);
		this.setState({ player: e.target.value });
	}

	handleSliderChange(e) {
		this.setState({ volume: e.target.value });
		console.log(e.target.value / 100);

		fetch(
			hostname + '/api/setvolume',
			{
				method: 'POST',
				body: JSON.stringify({ volume: (e.target.value / 100).toString(), player: this.state.player })
			}
		);
	}
	
	render() {
		let options = [];

		for(let i = 0; i < this.state.players.length; i++) {
			let player = this.state.players[i];
			options.push(<option key={i} value={player}>{player}</option>);
		}

		console.log('volume: ' + this.state.volume);

		return (
			<div>
				<div>
					<select onChange={this.handleDropdownChange}>
						{options}
					</select>
				</div>

				<RemoteButton
					value="Rewind"
					route="rewind"
					player={this.state.player}
				>
				</RemoteButton>
				<RemoteButton
					value="Play/Pause"
					route="playpause"
					player={this.state.player}
				>
				</RemoteButton>
				<RemoteButton
					value="Fast Forward"
					route="fastforward"
					player={this.state.player}
				>
				</RemoteButton>
				<input type="range" min="0" max="100" defaultValue="{this.state.volume}" className="slider" onChange={this.handleSliderChange}></input>
				<p>{this.state.volume}</p>
			</div>
		);
	}
}

export default App;
