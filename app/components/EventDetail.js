import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Template from './Templates/Template';
import { browserHistory } from 'react-router';

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
		fetch("/api/content/event/" + this.props.params.eventsid)
		  .then(function(response) { return response.json(); })
		  .then(function(data) {
			return data;
		  })
		  .then(function(data) {
			that.setState({events: data, template : data[0].template_id.name });
			that.checkEventExpiry(data);
		});
	}
	
	checkEventExpiry (data){
		var eventid = this.props.params.eventid ? this.props.params.eventid : '';
		var event = data.filter(function(data){return data.event_web_id === eventid})
		if(event.length){
			var date = new Date();
			date.toUTCString();
			var currentUTC = Math.floor(date.getTime()/ 1000)
			var eventUTC = Math.floor(new Date(event[0].event_end.utc).getTime()/ 1000);
			if(eventUTC < currentUTC) 
				browserHistory.push('/notfound');
		}
	}

	render() { 
		var eventid = this.props.params.eventid ? this.props.params.eventid : '';
		var renderedItem = this.state.events;
		var template = this.state.template;
		
		return (
			<div>
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

export default connect(mapStateToProps)(EventDetail);