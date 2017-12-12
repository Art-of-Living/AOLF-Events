import React from 'react';
import { connect } from 'react-redux'
import { submitContactForm } from '../../../actions/contact';
import Messages from '../../Messages';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router'
import fetch from 'isomorphic-fetch'

class Contact extends React.Component {
  constructor(props) {
    super(props);
	this.onSuccess = this.onSuccess.bind(this);
	this.onError = this.onError.bind(this);
    this.state = { name: '', email: '', tel : '', event : {}, events : {}, addClassName : '', userdetail : {}};
	this.onSubmit = true;
  }

  handleChange(event) {
	var flag = true;
	
	if(event.target.name == 'name'){
		$(this.name).next().html('');
		if(!event.target.value){
			$(this.name).next().html('Please fill this field');
			flag = false;
		}
	}
	
	if(event.target.name == 'tel'){
		$(this.tel).next().html('');
		
		if(isNaN(parseFloat(event.target.value)) && !isFinite(event.target.value)){
			$(this.tel).next().html('Please use valid number');
			flag = false;
		}
		
		if(!event.target.value){
			$(this.tel).next().html('Please fill this field');
			flag = false;
		}
		
		if(event.target.value.length > 10){
			$(this.tel).next().html('Please use 10 digit mobile number');
			flag = false;
		}
	}
	
	if(event.target.name == 'email'){
		var email = event.target.value;
		$(this.email).next().html('');
		
		if(!email){
			$(this.email).next().html('Please fill this field');
			flag = false;
		}
		
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if(!re.test(email)){
			$(this.email).next().html('Please use valid email');
			flag = false;
		}
		
	}  
	
	if(flag) this.onSubmit = true;
	else this.onSubmit = false;
    
	this.setState({ [event.target.name] : event.target.value });
  }
  
  handleSubmit(event) {
    event.preventDefault();
	if(this.onSubmit === false) return;
	$(this.loader).removeClass('display-none');
    this.props.dispatch(submitContactForm(this.state.name, this.state.email, this.state.tel, this.state.event, this.state.userdetail, this.onSuccess, this.onError));
  }
  
  filterEvent(eventid){
	  var event = {};
	  this.props.events.map(function(item, i) {
		  if(item.event_web_id == eventid) event = item;
	  })
	  return event;
  }
  
  componentWillMount(){
	this.getUserTimeZone();
  } 
	
  getUserTimeZone(){
	var that = this;
	fetch(
		"https://timezoneapi.io/api/ip"
	).then(function(response) { 			
		if (response.ok) {
			response.json().then((json) => {
				if(Object.keys(json.data).length){
					that.setState({
						userdetail : {
							country : (json.data.country && json.data.country != null) ? json.data.country : "",
							state : (json.data.state && json.data.state != null) ? json.data.state : "",
							city : (json.data.city && json.data.city != null) ? json.data.city : "",
							postal : (json.data.postal && json.data.postal != null) ? json.data.postal : "",
							timezone : (json.data.timezone && json.data.timezone != null) ? json.data.timezone.location : ""
						}
					});						
				}
			})
		}else{
			that.setState({
				userdetail : {
					country : "",
					state : "",
					city : "",
					postal : "",
					timezone : ""
				}
			});
		}
	});
  }
  
  componentDidMount(){
	  var that = this; 
	  var state = this.state;
	  
	  // Get value from select and load the event;
	  $(".selectbox").styler({
		  onSelectClosed: function(select) {
			  var eventId = $(that.SelectBox).val() ? $(that.SelectBox).val() : '';
			  
			  if(!state.event || !Object.keys(state.event).length){
				  that.state.event = that.filterEvent(eventId);
			  }
			  
			  eventId = eventId ? '/' + eventId : '';
			  
			  var event = state.event ? state.event : that.props.events[0];
			  var eventState = event.address.state ? that.slugifyUrl(event.address.state) : 'ca';
			  var eventCity = event.address.city ? that.slugifyUrl(event.address.city) : 'los-angeles';
			  
			  browserHistory.push('/' + eventState + '/' + eventCity + '/' + that.slugifyUrl(state.event.event_name) +  '/' + event.event_web_series_name + eventId);
		  },
	  });
  }
  
  onError (json){
	 $(this.loader).addClass('display-none');
	 this.props.dispatch({
		type: 'CONTACT_FORM_FAILURE',
		messages: Array.isArray(json) ? json : [json]
	 });
  }
   
  onSuccess (){	
	  var state = this.state   
	  var eventId = $(this.SelectBox).val() ? $(this.SelectBox).val() : '';
	  
	  if(!state.event || !Object.keys(state.event).length){
		  this.state.event = this.filterEvent(eventId);
	  }
	  
	  var event = state.event ? state.event : this.props.events[0];
	  var eventState = event.address.state ? this.slugifyUrl(event.address.state) : 'ca';
	  var eventCity = event.address.city ? this.slugifyUrl(event.address.city) : 'los-angeles';
	  $(this.loader).addClass('display-none');

	  this.props.router.push({
	    pathname: '/' + eventState + '/' + eventCity + '/' + this.slugifyUrl(state.event.event_name) +  '/' + event.event_web_series_name + '/' + eventId +'/thankyou',
		state: {
			event: this.state.event,
			userEmail: this.state.email
		}
	  });
  }
  
  formatDateTime(event){
	  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	  
	  var date = new Date(event.event_start.local);
	  
	  var start_time = new Date(event.event_start.local);
	  var start_time_hours = start_time.getHours() > 12 ? start_time.getHours() - 12 : start_time.getHours();
	  var start_time_minutes = start_time.getMinutes() < 10 ? "0" + start_time.getMinutes() : start_time.getMinutes();
	  var start_am_pm = start_time.getHours() >= 12 ? "PM" : "AM";
	  
	  var end_time = new Date(event.event_end.local);
	  var end_time_hours = end_time.getHours() > 12 ? end_time.getHours() - 12 : end_time.getHours();
	  var end_time_minutes = end_time.getMinutes() < 10 ? "0" + end_time.getMinutes() : end_time.getMinutes();
	  var end_am_pm = end_time.getHours() >= 12 ? "PM" : "AM";	  
	  
	  return days[date.getDay()] + ' ' + month[date.getMonth()] + date.getDate() + ': ' + start_time_hours + ':' + start_time_minutes + ' ' + start_am_pm + ' - ' + end_time_hours + ':' + end_time_minutes + ' ' + end_am_pm;  
  }
  
  slugifyUrl (string){
	return string
		.toString()
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
  }

  render() {
	var that = this;
	var events = this.props.events;
	var eventid = this.props.eventid;
	
	if(eventid){
		var selected = (<option value="">Select Date</option>);
		var checkIfEvent = (<button className="savespot">Save My Spot <i ref={(loader) => this.loader = loader} className="fa fa-circle-o-notch fa-spin fa-fw display-none" aria-hidden="true"></i></button>);
		var selectBox = events.map(function(item, i) {
			if(eventid == item.event_web_id){
				that.state.event = item;
				return <option value={item.event_web_id} selected>{that.formatDateTime(item)}</option>
			}else{
				return <option value={item.event_web_id}>{that.formatDateTime(item)}</option>
			}
		})
	} else {
		var selected = (<option value="" selected>Select Date</option>);
		var checkIfEvent = (<button className="disabled savespot" disabled>Save My Spot</button>);
		var selectBox = events.map(function(item, i) {
			return <option value={item.event_web_id}>{that.formatDateTime(item)}</option>
		})
	}
	
	var style = {
		highlight : {
			"background" : "url(/templates/" + process.env.REACT_TEMPLATE + "/images/highlight_bg.png) no-repeat scroll 50% 50% /cover"
		}
	};
	
    return (
	  <div>
		  <section className={this.props.addClassName + " highlight"} style={style.highlight} id="chose_day">
				<h2 className="highlight__overlay_title">
				{events[0].event_name}
				</h2>
				<div className="row">
					<div className="col-md-12">
						<div className="highlight--left_block">
							<h2>{events[0].event_name}</h2>
							<h5>Register Now for FREE</h5>
						</div>
						<div className="highlight--right_block">
							<h3>Choose a date & time</h3>
							<select className={eventid ? 'selectbox' : 'selectbox no-event'} ref={(select) => {this.SelectBox = select }}>
								{selected}
								{selectBox}
							</select>
						</div>
						<div className="col-md-12 clearfix contact-error">
							<Messages messages={this.props.messages}/>
						</div>
						<form onSubmit={this.handleSubmit.bind(this)} >
							<div>
								<input type="text" ref={(name) => this.name = name} name="name" onChange={this.handleChange.bind(this)} placeholder="First Name *" required />
								<div className="error"></div>
								<input type="email" name="email" ref={(email) => this.email = email} onChange={this.handleChange.bind(this)} placeholder="Email *" required />
								<div className="error"></div>
							</div>
							<div>
								<input type="text" ref={(tel) => this.tel = tel} name="tel" onChange={this.handleChange.bind(this)} placeholder="Phone *" required />
								<div className="error"></div>
								{checkIfEvent}
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