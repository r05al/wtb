import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class List extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			showItems: false
		}
	}

	toggleItems() {
		this.setState({showItems: !this.state.showItems})
	}

  render() {

  	let clothingItems;
  	if (this.state.showItems) {
  		clothingItems = this.props.clothingItems.map((item) => {
	  		return (
	  			<div className='clothing' key={item.id} onClick={
	  				this.props.lookCallbacks.select.bind(null, item) }>
	  				<div className="item-edit"><Link to={'/edit/'+item.id}>✎</Link></div>
	  				<img src={ item.href } />
	  				{ item.title }
	  			</div>
	  		);
	  	});
  	}

    return (
      <div className={ this.state.showItems ? "list list--is-open" : "list" }>
      	<div className={
      		this.state.showItems ? "list-title list-title--is-open" : "list-title"
      		} onClick={this.toggleItems.bind(this)}>
      		{this.props.title}
      	</div>
      	{ clothingItems }
      </div>
    );
  }
}

List.propTypes = {
	title: PropTypes.string.isRequired,
	clothingItems: PropTypes.arrayOf(PropTypes.object),
	lookCallbacks: PropTypes.object
};

export default List;
