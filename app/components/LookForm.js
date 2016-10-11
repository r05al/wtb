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

		let pieces = this.props.draftLook.pieces;

		let selectedPieces = Object.keys(pieces).filter((item) => {
			return Boolean(pieces[item].id);
		});

		let images = selectedPieces.map((item) => {
			return <div key={item} className="draft-img" style={{width: "20%"}}><img src={pieces[item].href}/></div>;
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
											placeholder="Description" /><br />
						<label htmlFor="date">Date</label>
						<DatePicker placeholderText="Click to select a date"
						            onChange={this.handleDate.bind(this, 'date')}
						            isClearable={true}
						            selected={this.props.draftLook.date} />
            <div style={{display: 'flex'}}>
            	{ images }
            </div>
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
		pieces: PropTypes.object
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default LookForm;