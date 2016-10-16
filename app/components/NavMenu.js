import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import woodgrain from '../../public/dark-edges.jpg';

class NavMenu extends Component {
	constructor() {
		super(...arguments);
		this.state={
			showMenu: false
		};
	}

	toggleMenu() {
		this.setState({ showMenu: !this.state.showMenu });
	}



	render() {

		let backgroundStyle = {
			width: "100%",
			height: "inherit",
			position: "fixed"
		}

		let bottomStyle = {
			height: "100%", width: "83%", 
			margin: "0 auto",
			backgroundColor: "#BDBDBD",

		}

		let drawerTopStyle = {
				height: "10%", width: "100%",
				backgroundImage: "url(" + woodgrain+ ")",
				backgroundSize: "cover",
				boxShadow: "inset 0 0 9em black",
				position: "relative"
		}

		let drawerFaceStyle = { 
			height: "10%", 
			width: "110%",
			backgroundImage: "url(" + woodgrain+ ")",
			backgroundSize: "cover",			
			boxShadow: "inset 0 0 6em black",
			position: "absolute",
			borderRadius: "6%",
			left: "-5%",
			bottom: "0%"
		}

		let linkStyle = {
			margin: "5% auto",
			width: "70%",
			textAlign: "center",
			fontWeight: "900",
			fontSize: "3em",
			verticalAlign: "middle",
			alignSelf: "center",
			flex: "1"
		}

		return (
			<div style={backgroundStyle}>
				<div className="drawer-top" style={drawerTopStyle}>
					<div id="nav" 
							 className={this.state.showMenu ? "open" : ""}
							 onClick={this.toggleMenu.bind(this)}>
					  <span></span>
					  <span></span>
					  <span></span>
					  <span></span>
					</div>
					<div className={this.state.showMenu ? "drawer" : "drawer drawer-active"}>
						<div className="drawer-inner" style={bottomStyle}>
							<div className="links" style={{height: "80%", width: "83%", 
																						position: "absolute", top: "0",
																						display: "flex",
																						flexDirection: "column"}}>
								<div style={linkStyle}>
									<Link to='/'>HOME</Link>
								</div>
								<div style={linkStyle}>
									<Link to='/pack'>PACK</Link>
								</div>
								<div style={linkStyle}>
									<Link to='/info'>INFO</Link>
								</div>
							</div>
							<div className="shadow" style={{
								borderBottom: "15px solid #424242",
								borderLeft: "25px solid transparent",
								borderRight: "25px solid transparent",
								height: "0",
								width: "83%",
								position: "absolute",
								bottom: "17%"
							}}>
							</div>					
							<div className="shadow-left" style={{
								borderLeft: "25px solid #212121",
								borderBottom: "16px solid transparent",
								height: "83%",
								width: "0%",
								position: "absolute",
								bottom: "17%",
								left: "8.5%"
							}}>
							</div>
							<div className="shadow-right" style={{
								borderRight: "25px solid #212121",
								borderBottom: "16px solid transparent",
								height: "83%",
								width: "0%",
								position: "absolute",
								bottom: "17%",
								right: "8.5%"
							}}>
							</div>
							<div className="drawer-inner-edge" style={{ height: "7%", width: "83%",
							backgroundColor: "#303030",
							position: "absolute",
							bottom: "10%"}}>
							</div>
							<div className="drawer-inner-face" style={drawerFaceStyle}>
							</div>							
						</div>
					
					</div>
				</div>
					
			</div>
		);
	}

}

NavMenu.propTypes = {

};

export default NavMenu;