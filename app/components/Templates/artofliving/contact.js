import React from 'react';
import { connect } from 'react-redux'
import { submitContactForm } from '../../../actions/contact';
import Messages from '../../Messages';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router'

class Contact extends React.Component {
  constructor(props) {
    super(props);
	this.onSuccess = this.onSuccess.bind(this);
    this.state = { name: '', email: '', tel : '', event : {}, addClassName : ''};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
	this.state.event = this.props.event
    this.props.dispatch(submitContactForm(this.state.name, this.state.email, this.state.tel, this.state.event, this.onSuccess));
  }
  
  onSuccess (){
	  this.props.router.push({
	    pathname: '/thankyou',
		state: {
			event: this.state.event,
			userEmail: this.state.email
		}
	  })
	}

  render() {
	var style = {
		highlight : {
			"background" : "url(/templates/" + process.env.REACT_TEMPLATE + "/images/highlight_bg.png) no-repeat scroll 50% 50% /cover"
		}
	};
    return (
	  <div>
		  <section className={this.props.addClassName + " highlight"} style={style.highlight} id="chose_day">
				<h2 className="highlight__overlay_title">
					Mind &   Meditation
				</h2>
				<div className="row">
					<div className="col-md-12">
						<div className="highlight--left_block">
							<h2>Mind &   Meditation</h2>
							<h5>Register Now for FREE</h5>
						</div>
						<div className="highlight--right_block">
							<h3>Choose a date & time</h3>
							<select>
								<option selected>Tue Oct 31: 12:30 PM - 2:00 PM</option>
								<option>Wed Nov 1: 12:30 PM - 2:00 PM</option>
							</select>
						</div>
						<div className="col-md-12">
							<div class="col-md-5"></div>
							<div class="col-md-7">
								<Messages messages={this.props.messages}/>
							</div>
						</div>
						<form onSubmit={this.handleSubmit.bind(this)} >
							<div>
								<input type="text" name="name" onChange={this.handleChange.bind(this)} placeholder="First Name *" required />
								<input type="email" name="email" onChange={this.handleChange.bind(this)} placeholder="Email *" required />
							</div>
							<div>
								<input type="text" name="tel" onChange={this.handleChange.bind(this)} placeholder="Phone *" required />
								<button>Save My Spot</button>
							</div>
							<p>
								By registering I agree to the <a href="https://www.artofliving.org/us-en/privacy-policy" target="_blank">privacy policy</a>, confirm that I am at least 18 years of age, and agree to receive promotional phone calls, text messages, and e-mails from The Art of Living. We respect your privacy and you can unsubscribe at any time.
							</p>
						</form>
					</div>
				</div>
			</section>
	    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

const connectedContainer = connect(mapStateToProps)(Contact);
const RoutedContainer = withRouter(connectedContainer);
export default RoutedContainer;