import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Look extends Component {
  render() {

    let { jacket, shirt, pant, shoe } = this.props.look.pieces

    let pieces = [jacket, shirt, pant, shoe].map((item) => {
    	let info;
    	if (item.id) {
    		info = <img src={item.href}/>
    	} else {
    		info = <p><i>Select your {item.type}</i></p>
    	}
    	return <div className="look-grid" key={item.type}
									onClick={ this.props.lookCallbacks.deselect.bind(null, item) }>
								{info}
						 </div>
    });

    let edit;
    if (this.props.look.id) {
    	edit = <div className="look-edit"><Link to={`looks/${this.props.look.id}/edit`}>✎</Link></div>
    }

    return (
      <div className="look">
        <div className="look-description">
        	{ edit }
        	<p>{this.props.look.title}</p>
        	<p>{this.props.look.description}</p>
        </div>
        <div className="look-flex">
	        { pieces }
	      </div>
      </div>
    );
  }
}

Look.propTypes = {
	look: PropTypes.object,
	lookCallbacks: PropTypes.object
}

export default Look;