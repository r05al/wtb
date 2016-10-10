import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Look extends Component {
  render() {
    let pieces = this.props.look.pieces.map((item) => {
    	return <div className="look-grid" key={item.id}
    							style={{
    								backgroundImage: `url(${item.href})`,
    								backgroundSize: '100%' 
    							}}
									onClick={ this.props.lookCallbacks.deselect.bind(null, item) }>
							<span className="look-title">
							 	{item.title}
							</span>
						 </div>
    });

    let jacket = this.props.look.pieces.filter((item) => item.type == "jacket");
    let shirt = this.props.look.pieces.filter((item) => item.type == "shirt");
    let pant = this.props.look.pieces.filter((item) => item.type == "pant");
    let shoe = this.props.look.pieces.filter((item) => item.type == "shoe");

    return (
      <div className="look">
      	<div className="item-edit"><Link to={'/save'}>✎</Link></div>
        {this.props.look.title} - {this.props.look.description}
        { pieces }
      </div>
    );
  }
}

Look.propTypes = {
	look: PropTypes.object,
	lookCallbacks: PropTypes.object
}

export default Look;