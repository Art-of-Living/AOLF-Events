import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {    
    return (
		<div>
			<nav className="navbar navbar-default navigation-clean-search">
				<div className="container"></div>
			</nav>			
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
