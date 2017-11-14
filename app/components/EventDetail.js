import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Template from './Templates/Template';

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
			console.log(data);
			that.setState({events: data, template : data[0].template_id.name });
		});
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