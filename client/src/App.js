import React from 'react';
import './App.css';
import RemoteButton from './RemoteButton';

let IP = '10.0.0.213'

class App extends React.Component {
	state = {
		players: [],
		player: 'vlc',
		volume: 10
	}
	
	constructor(props) {
		super(props);

		fetch('http://' + IP + ':5000/api/getplayers').then(res => {
			res.json().then(players => {
				console.log(players);
				this.setState({
					players: players
				})
			});
		});

		fetch('http://' + IP + ':5000/api/getvolume').then(res => {
			res.json().then(volume => {
				this.setState({
					volume: volume
				})
				console.log('set volume: ' + volume);
			})
		});

		this.handleSliderChange = this.handleSliderChange.bind(this);
	}

	handleDropdownChange(e) {
		console.log(e.target);
		this.setState({ player: e.target.value });
	}

	handleSliderChange(e) {
		this.setState({ volume: e.target.value });
		console.log(this.state.volume);

		fetch(
			'http://' + IP + ':5000/api/setvolume',
			{
				method: 'POST',
				body: JSON.stringify({ volume: e.target.value })
			}
		);
	}
	
	render() {
		let options = [];

		for(let player of this.state.players)
			options.push(<option value={player}>{player}</option>);

		console.log(this.state.volume);

		return (
			<div>
				{/* <div>
					<select onChange={this.handleDropdownChange}>
						{options}
					</select>
				</div> */}

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
