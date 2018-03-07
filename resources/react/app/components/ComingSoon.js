import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Messages from './Messages';

class ComingSoon extends Component {	
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		var self = this;
		setTimeout(function(){
			$(self.loader).hide();
		}, 2000);		
	}
  
    render() {
     return (
		<div>
			<div className="screen-loader" ref={(loader) => { this.loader = loader; }}></div>
			<div id="preload">
				<div id="preload-status"></div>
			</div>
			<div id="container">
				<section className="intro">
					<div className="intro-image"></div>
					<div className="center-content">
						<div className="intro-content text-center">		
							<div className="logo">
								<h2 className="text-logo">Art Of Living</h2>
							</div>											
							<h1 className="intro-title">We are Comming Soon<span className="obak">!</span></h1>
							<i className="fa fa-clock-o fa-spin fa-4x fa-clock-spin"></i>	
							<ul className="countdown">
								<li>
									<span className="days">06</span>
									<p className="days-ref">days</p>
								</li>
								<li className="seperator"><i className="fa fa-clock-o"></i><br/><i className="fa fa-clock-o"></i></li>
								<li>
									<span className="hours">12</span>
									<p className="hours-ref">hours</p>
								</li>
								<li className="seperator"><i className="fa fa-clock-o"></i><br/><i className="fa fa-clock-o"></i></li>
								<li>
									<span className="minutes">05</span>
									<p className="minutes-ref">minutes</p>
								</li>
								<li className="seperator"><i className="fa fa-clock-o"></i><br/><i className="fa fa-clock-o"></i></li>
								<li>
									<span className="seconds">00</span>
									<p className="seconds-ref">seconds</p>
								</li>
							</ul>				
							<div className="intro-subtitle">
								<p>We are currently Creating Something Awesome.</p>
							</div>											
						</div>
					</div>
					<div className="container-bottom-content">	
						<div className="social">
							<a href="https://www.facebook.com"><i className="fa fa-facebook fa-2x fa-social"></i></a>
							<a href="https://www.twitter.com"><i className="fa fa-twitter fa-2x fa-social"></i></a>
							<a href="https://www.linkedin.com"><i className="fa fa-linkedin fa-2x fa-social"></i></a>
							<a href="https://www.plus.google.com"><i className="fa fa-google-plus fa-2x fa-social"></i></a>
						</div>
						<div className="notify-after text-center">						
							<h2>Notify Me</h2>
							<p>Subscribe our mail list for Latest update</p>
							<form id="mc-form" className="form-inline" role="form">
								<div className="form-group subscribe-form">							  							  
									<input id="mc-email" type="email" placeholder="Your email" className="form-control input-label input-notify-after" />
									<button type="submit" className="btn btn-default btn-notify-after"><i className="fa fa-send-o"></i></button>
								</div>				
								<div className="subscribe_lebel">
									<label for="mc-email"></label>
								</div> 								
							</form>																							
						</div>										
						<button className="trigger">
							<svg width="100%" height="100%" viewBox="0 0 60 60" preserveAspectRatio="none">
								<g className="icon icon-grid">
									<rect x="32.5" y="5.5" width="22" height="22"/>
									<rect x="4.5" y="5.5" width="22" height="22"/>
									<rect x="32.5" y="33.5" width="22" height="22"/>
									<rect x="4.5" y="33.5" width="22" height="22"/>
								</g>
								<g className="icon icon-cross">
									<line x1="4.5" y1="55.5" x2="54.953" y2="5.046"/>
									<line x1="54.953" y1="55.5" x2="4.5" y2="5.047"/>
								</g>
							</svg>
							<span>View content</span>
						</button>											
					</div>			
				</section>	
			</div> 
		</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages : state.messages
  };
};

export default connect(mapStateToProps)(ComingSoon);
