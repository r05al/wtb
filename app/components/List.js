import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class RightNavButton extends Component {
  render() {
			let style = {
			left: 0,
			position: "absolute",
			zIndex: 1,
			top: "45%",
			opacity: ".7",
			cursor: "pointer"
		}
    return <span{...this.props} style={style}>←</span>  
  }
}

class LeftNavButton extends Component {
  render() {
		let style = {
			right: 0,
			position: "absolute",
			zIndex: 1,
			top: "45%",
			opacity: ".7",
			cursor: "pointer"
		}
    return <span{...this.props} style={style}>→</span>  
  }
}

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
  	let leftNav = <LeftNavButton />;
  	let rightNav = <RightNavButton />;
		let settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 7,
			slidesToScroll: 1,
			nextArrow: leftNav,
			prevArrow: rightNav
		};

  	let clothingItems;
  	if (this.state.showItems) {
  		clothingItems = this.props.clothingItems.map((item) => {
	  		return (
	  			<div className='clothing' key={item.id} onClick={
	  				this.props.lookCallbacks.select.bind(null, item) }>
	  				<div style={{width: "90%", margin: "0 auto"}}>
		  				<div className="item-edit"><Link to={`items/${item.id}/edit`}>✎</Link></div>
		  				<img src={ item.href } />
		  			</div>
	  			</div>
	  		);
	  	});
	 		var slider = <Slider {...settings}>{clothingItems}</Slider>
  	}

    return (
    	<div className="list">
	    	<div className={ this.state.showItems ? 
    					`list-title list-title--is-open ${this.props.id}` : 
    					`list-title ${this.props.id}`} 
    					onClick={this.toggleItems.bind(this)}>
	      </div>
    		<ReactCSSTransitionGroup transitionName="toggle"
    		                         transitionEnterTimeout={500}
    		                     		 transitionLeaveTimeout={500}>
		  	{ slider }
		  	</ReactCSSTransitionGroup>
	  	</div>
    );
  }
}

List.propTypes = {
	clothingItems: PropTypes.arrayOf(PropTypes.object),
	lookCallbacks: PropTypes.object
};

export default List;
