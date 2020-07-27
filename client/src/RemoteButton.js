import React from 'react';
import './RemoteButton.css';
import hostname from './ip.js';

class RemoteButton extends React.Component {
	handleClick() {
		fetch(
			hostname + '/api/' + this.props.route,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({ player: this.props.player })
			}
		);
	}

	render() {
		return (
			<div>
				<button className="remote-button" onClick={this.handleClick.bind(this)}>
					{ this.props.value }
				</button>
			</div>
		);
	}
}

export default RemoteButton
