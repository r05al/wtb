import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';


class LookForm extends Component {

	handleChange(field, e) {
		this.props.handleChange(field, e.target.value);
	}

	handleDate(field, e) {
		this.props.handleChange(field, e);
	}

	handleClose(e) {
		e.preventDefault();
		this.props.handleClose();
	}

	render() {
		let pieces = this.props.draftLook.pieces.map((piece) => {
			return piece.title;
		});
		return (
			<div>
				<div className="item big">
					<form onSubmit={this.props.handleSubmit.bind(this)}>
						<input type='text'
									 value={this.props.draftLook.title}
									 onChange={this.handleChange.bind(this,'title')}
									 placeholder="Look Name"
									 required={true}
									 autoFocus={true} /><br />
						<textarea value={this.props.draftLook.description}
											onChange={this.handleChange.bind(this,'description')}
											placeholder="Description"
											required={true} /><br />
						<label htmlFor="date">Date</label>
						<DatePicker placeholderText="Click to select a date"
						            onChange={this.handleDate.bind(this, 'date')} 
						            selected={this.props.draftLook.date} />
            <label htmlFor="pieces">Pieces</label>
            	{ pieces }
						<div className="actions">
							<button type="submit">{this.props.buttonLabel}</button>
						</div>
					</form>
				</div>
				<div className="overlay" onClick={this.handleClose.bind(this)}>
				</div>
			</div>
		);
	}

}

LookForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	draftLook: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		date: PropTypes.object,
		pieces: PropTypes.arrayOf(PropTypes.object)
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default LookForm;