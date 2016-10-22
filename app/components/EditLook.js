import React, { Component, PropTypes } from 'react';
import LookForm from './LookForm';

class EditLook extends Component {

	componentWillMount() {
		let look = this.props.look;
		this.setState(Object.assign({}, look));
	}

	handleChange(field, value) {
		this.setState({[field]: value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.lookCallbacks.updateLook(this.state);
		this.props.history.push('/');
	}

	handleClose(e) {
		this.props.history.push('/');
	}

	render() {
		return (
			<LookForm draftLook={this.state}
												buttonLabel="Update Look"
												handleChange={this.handleChange.bind(this)}
												handleSubmit={this.handleSubmit.bind(this)}
												handleClose={this.handleClose.bind(this)} />
		);
	}
}

EditLook.PropTypes = {
	look: PropTypes.object,
	itemCallbacks: PropTypes.object
};

export default EditLook;