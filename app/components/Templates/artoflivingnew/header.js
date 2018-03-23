import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {    
    return (
		<header className="header">
			<div className="row">
				<div className="col-md-12">
					<div className="header__logo text-center">
						<a href="http://events.us.artofliving.org">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logo.png"} alt="logo" />
						</a>
					</div>
				</div>
			</div>
		</header>
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
