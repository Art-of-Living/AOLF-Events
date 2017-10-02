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
		fetch("/api/content/event/" + this.props.params.id)
		  .then(function(response) { return response.json(); })
		  .then(function(data) {
			return data;
		  })
		  .then(function(data) {
			that.setState({ event: data, template : data.template_id.name });
		});
	}

	render() { 
		var renderedItem = this.state.event;
		var template = this.state.template;
		console.log(renderedItem);
		return (
			<div>
				<Template name={template} data={renderedItem}/>
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