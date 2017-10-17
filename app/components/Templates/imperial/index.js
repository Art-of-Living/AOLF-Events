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
		<div className="header-blue">
			<Header/>
			<div className="container hero">
				<div className="row">
					<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-0">
						<h1>{event.event_name}</h1>
						<p>{event.event_description}</p>
					</div>
				</div>
			</div>
		</div>
		<Contact event_id={event._id}/>
      </div>
    );
  }
}

export default Index;