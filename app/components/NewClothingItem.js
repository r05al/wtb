import React, { Component, PropTypes } from 'react';
import ClothingItemForm from './ClothingItemForm';

class NewClothingItem extends Component {

	componentWillMount() {
		this.setState({
			id: Date.now(),
			title: "",
			tags: "",
			type: "jacket",
			available: true	
		});
	}

	handleChange(field, value) {
		this.setState({[field]: value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.itemCallbacks.addItem(this.state);
		this.props.history.push('/');
	}

	handleClose(e) {
		this.props.history.push('/');
	}

	render() {
		return (
			<ClothingItemForm draftItem={this.state}
												buttonLabel="Add Clothing Item"
												handleChange={this.handleChange.bind(this)}
												handleSubmit={this.handleSubmit.bind(this)}
												handleClose={this.handleClose.bind(this)} />
		);
	}
}

NewClothingItem.PropTypes = {
	itemCallbacks: PropTypes.object
};

export default NewClothingItem;