import React from 'react';
import './RemoteButton.css';

let IP = '10.0.0.213'

class RemoteButton extends React.Component {
	handleClick() {
		fetch(
			'http://' + IP + ':5000/api/' + this.props.route,
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
