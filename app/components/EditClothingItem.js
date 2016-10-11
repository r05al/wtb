import React, { Component, PropTypes } from 'react';
import ClothingItemForm from './ClothingItemForm';

class EditClothingItem extends Component {

	componentWillMount() {
		let item = this.props.clothingItems.find((item) => item.id == this.props.params.id);
		this.setState(Object.assign({}, item));
	}

	handleChange(field, value) {
		this.setState({[field]: value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.itemCallbacks.updateItem(this.state);
		this.props.history.push('/');
	}

	handleClose(e) {
		this.props.history.push('/');
	}

	render() {
		return (
			<ClothingItemForm draftItem={this.state}
												buttonLabel="Edit Clothing Item"
												handleChange={this.handleChange.bind(this)}
												handleSubmit={this.handleSubmit.bind(this)}
												handleClose={this.handleClose.bind(this)} />
		);
	}
}

EditClothingItem.PropTypes = {
	itemCallbacks: PropTypes.object
};

export default EditClothingItem;