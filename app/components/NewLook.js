import React, { Component, PropTypes } from 'react';
import LookForm from './LookForm';
import moment from 'moment';

class SaveLook extends Component {

	componentWillMount() {
		this.setState({
			id: Date.now(),
			title: "",
			description: "",
			date: moment(),
			pieces: this.props.look.pieces
		});
	}

	handleChange(field, value) {
		this.setState({[field]: value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.lookCallbacks.addLook(this.state);
		this.props.history.push('/');
	}

	handleClose(e) {
		this.props.history.push('/');
	}

	render() {
		return (
			<LookForm draftLook={this.state}
												buttonLabel="Save Look"
												handleChange={this.handleChange.bind(this)}
												handleSubmit={this.handleSubmit.bind(this)}
												handleClose={this.handleClose.bind(this)} />
		);
	}
}

SaveLook.PropTypes = {
	look: PropTypes.object,
	lookCallbacks: PropTypes.object
};

export default SaveLook;