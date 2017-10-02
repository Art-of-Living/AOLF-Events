import React from 'react';
import Header from './header';
import Footer from './footer';
import Contact from '../../Contact';

class Index extends React.Component {
  render() {
    var event = this.props.data;
	var eventDate = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
    return (
      <div>
		<div className="header-nightsky">
			<Header/>
			<div className="hero">
				<h1>{event.event_name}</h1>
				<p>{event.event_description}</p>
			</div>
		</div>
		<Contact />
      </div>
    );
  }
}

export default Index;