import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { withRouter } from 'react-router'
import Template from './Templates/Template';
import { browserHistory } from 'react-router';

import GoogleTagManager from './GoogleTagManager';

class EventDetail extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			event : {},
			template : ''
		};
	}
	
	componentWillMount() {
		var that = this;
		fetch("/api/content/event/" + this.props.params.eventsid,{
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				where: {
					sort : {event_start : {local: -1}}
				}
			})
		}).then(function(response) { 
			if (response.ok) {
				response.json().then((data) => {
					if(data.length){
						that.setState({events: data, template : data[0].template_id.name });
						that.checkEventExpiry(data);
					}else{
						window.location = 'https://www.artofliving.org/us-en/search/course#distance=2&sSearch=&st=&lat=&lng=&ctype=12371,12517,54553,12519&acol=0&c=&cc=&d1=&d2=';
					}
				});
			}else{
				window.location = 'https://www.artofliving.org/us-en/search/course#distance=2&sSearch=&st=&lat=&lng=&ctype=12371,12517,54553,12519&acol=0&c=&cc=&d1=&d2=';
			}	
		});
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
	
	checkEventExpiry (data){
		var that = this;
		var eventid = this.props.params.eventid ? this.props.params.eventid : '';
		var event = data.filter(function(data){return data.event_web_id === eventid})
		if(event.length){
			var eventUTC = event[0].event_start.utc;
			var currentUTC = window.date.date;
			
			console.log(event[0].event_start.utc);
			console.log(currentUTC);
			
			if(eventUTC < currentUTC){
				// Set status to inactive in the database
				fetch("/api/content/event/" + this.props.params.eventid, {
				  method: 'put',
				  headers: { 'Content-Type': 'application/json' },
				  body: JSON.stringify({
					event_status: 'Inactive'
				  })
				}).then((response) => {
				  if (response.ok) {
					return response.json().then((json) => {
						var eventName = that.slugifyUrl(event[0].event_name);
						var eventState = event[0].address.state ? that.slugifyUrl(event[0].address.state) : 'ca';
						var eventCity = event[0].address.city ? that.slugifyUrl(event[0].address.city) : 'los-angles';
						
						// If there is no event then move it to artofliving else on the event series id
						if(data.length == 1){
							window.location = 'https://www.artofliving.org/us-en/search/course#distance=2&sSearch=&st=&lat=&lng=&ctype=12371,12517,54553,12519&acol=0&c=&cc=&d1=&d2=';
						}else{
							browserHistory.push('/' + eventState + '/' + eventCity + '/' + eventName + '/' + event[0].event_web_series_name);
							window.location.reload();							
						}
					});
				  } else {
					return response.json().then((json) => {
					  var json = Array.isArray(json) ? json : [json];
					});
				  }
				})
			}
		}
	}

	render() { 
		var eventid = this.props.params.eventid ? this.props.params.eventid : '';
		var renderedItem = this.state.events;
		var template = this.state.template;
		return (
			<div>
				<GoogleTagManager gtmId='GTM-N2J496' />
				<Template name={template} eventid={eventid} data={renderedItem}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    messages : state.messages
  };
};

export default withRouter(connect(mapStateToProps)(EventDetail));