import React, { Component, PropTypes } from 'react';

class Look extends Component {
  render() {
    let look = this.props.look.map((item) => {
    	return <div className="look-grid" key={item.id}
									onClick={ this.props.lookCallbacks.deselect.bind(null, item) }>
						 	{item.title}
						 	<img src={item.href} />
						 </div>
    });
    return (
      <div className="look">
        {this.props.title}
        { look }
      </div>
    );
  }
}

Look.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	date: PropTypes.object,
	look: PropTypes.arrayOf(PropTypes.object),
	lookCallbacks: PropTypes.object
}

export default Look;