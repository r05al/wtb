import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Look extends Component {
  render() {

    let { jacket, shirt, pant, shoe } = this.props.look.pieces

    let pieces = [jacket, shirt, pant, shoe].map((item) => {
    	let info;
      if (item.href && item.href.includes('placehold.it')) {
        info = <span style={{textAlign: "center", width: "100%"}}>
                {item.title}
               </span>;
      }
    	return <div className="look-grid" key={item.type}
									onClick={ this.props.lookCallbacks.deselect.bind(null, item) }>
                <img src={item.href} />
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
        	<h2><strong>{this.props.look.title}</strong></h2>
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