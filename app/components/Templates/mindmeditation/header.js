import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {    
    return (
		<div>
			<div className="home-banner">
				<div className="container">
					<div className="logo mt">
						<img src="/images/logo.png" alt="logo" className="img-responsive" /> 
					</div>
					<div className="home-banner-tageline mt-1">
							<h1>MIND & MEDITATION</h1>
							<h4>FREE Introductory Workshop to <span> The Happiness Program </span> </h4>
						<a className="btn-submit button" href="#">Save a spot</a>
					</div>
					<div className="mb"></div>
				</div>	
			</div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Header);
