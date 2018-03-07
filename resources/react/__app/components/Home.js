import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Messages from './Messages';
import Header from './Header';
import Footer from './Footer';
import fetch from 'isomorphic-fetch';

class Home extends Component {	
	constructor(props) {
		super(props)
		
		this.state = {
			events : [],
			file : '/images/artofliving.jpeg'
		};
	}
	
	componentWillMount() {
		var that = this;
		fetch("/api/content/event")
		  .then(function(response) { return response.json(); })
		  .then(function(data) {
			return data;
		  })
		  .then(function(data) {
			that.setState({ events: data });
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
  
    render() {
	 var that = this;
	 const renderItems = this.state.events.map(function(item, i) {
		  var eventName = that.slugifyUrl(item.event_name);
		  var eventState = item.address.state ? that.slugifyUrl(item.address.state) : 'ca';
		  var eventCity = item.address.city ? that.slugifyUrl(item.address.city) : 'los-angles';
		  if(item.event_type == 'inperson'){
			  return <div className="col-sm-4"><div className="panel"><div className="panel-body"><h3>{item.event_name}</h3>
			  <p>{item.event_description}</p><Link className="btn btn-default" to={`${eventState}/${eventCity}/${eventName}/${item.event_web_series_name}/${item.event_web_id}`}>View Details</Link></div></div></div>			  
		  } else if(item.event_type == 'online'){
			  return <div className="col-sm-4"><div className="panel"><div className="panel-body"><h3>{item.event_name}</h3>
			  <p>{item.event_description}</p><Link className="btn btn-default" to={`online/event/${eventName}/${item.event_web_series_name}/${item.event_web_id}`}>View Details</Link></div></div></div>			  
		  }
	 });
	 
     return (
		<div>
			<Header/>
			  <div className="container">
				<Messages messages={this.props.messages}/>
				<div className="row">
				  {renderItems}
				</div>
			  </div>
			<Footer/>
		</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages : state.messages
  };
};

export default connect(mapStateToProps)(Home);
