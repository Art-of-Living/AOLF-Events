import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router';

class ThankYou extends React.Component {
	
  constructor(props) {
		super(props)
		
		this.state = {
			event : {},
			userEmail : ''
		}
		
		if(this.props.location.state === null){
			this.props.router.push({
				pathname: '/events'
			})
		}
  }
  
  componentDidMount(){
	  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			$('body').addClass('ios thank-you-page');
	  } else{
			$('body').addClass('web thank-you-page');
	  };
	  addeventatc.refresh();
	  addthis._render();
  }
  
  componentWillUnmount() {
	$('body').removeClass('thank-you-page');
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
	this.state.event = this.props.location.state.event;
	this.state.userEmail = this.props.location.state.userEmail;
	
	var event = this.state.event;
	var eventState = event.state ? this.slugifyUrl(event.state) : 'ca';
	var eventCity = event.city ? this.slugifyUrl(event.city) : 'los-angeles';
	
	return (
		<div>
		  <section className="thank_you_container">
			<div className="inner_container">
				<h6>Thank you, your seat has been reserved</h6>
				<p>A confirmation email has been sent to {this.state.userEmail}</p>
				<h1>
					You&#8217;re all set to experience the <strong>Mind & Meditation</strong> workshop and discover the power of the breath.
				</h1>

				<div className="thank_you_buttons">
					<a href="#">
						<div title="Add to Calendar" className="addeventatc">
							Add to Calendar
							<span className="start">{this.state.event.event_start_date}</span>
							<span className="end">{this.state.event.event_end_date}</span>
							<span className="timezone">America/Los_Angeles</span>
							<span className="title">{this.state.event.event_name}</span>
							<span className="description">Description of the event</span>
							<span className="location">Location of the event</span>
						</div>
					</a>
					<a href="#">
						<i className="fa fa-map-marker" aria-hidden="true"></i>
						Get directions
					</a>
					<div className="map_section--direction-icon">
						<a className="map_section--direction-link" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(this.state.event.street_address +" "+ this.state.event.city +" "+ this.state.event.state +" "+ this.state.event.zipcode +"&dirflg=w")}><img src={"/templates/ArtOfLiving/images/man-walking-directions-button.png"}/></a>
						<a className="map_section--direction-link" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(this.state.event.street_address +" "+ this.state.event.city +" "+ this.state.event.state +" "+ this.state.event.zipcode +"&dirflg=d")}><img src={"/templates/ArtOfLiving/images/sports-car.png"}/></a>
						<a className="map_section--direction-link" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(this.state.event.street_address +" "+ this.state.event.city +" "+ this.state.event.state +" "+ this.state.event.zipcode +"&dirflg=r")}><img src={"/templates/ArtOfLiving/images/underground.png"}/></a>
						<a className="map_section--direction-link" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(this.state.event.street_address +" "+ this.state.event.city +" "+ this.state.event.state +" "+ this.state.event.zipcode +"&dirflg=b")}><img src={"/templates/ArtOfLiving/images/youth-bicycle.png"}/></a>
					</div>
				</div>
				<p>
					This event is best enjoyed with friends. Click below to share:
				</p>
				<div className="addthis_inline_share_toolbox" data-url={'http://' + window.location.hostname + '/' + eventState + '/' + eventCity + '/' + this.slugifyUrl(event.event_name) +  '/' + event.event_series_name + '/' + event.event_id} data-title="Check out this URL"></div>
				<p>
					<a href={"mailto:" + event.contact_email + "?cc=Anna.chicgo@artofliving.org&body=" + 'http://' + window.location.hostname + '/' + eventState + '/' + eventCity + '/' + this.slugifyUrl(event.event_name) +  '/' + event.event_series_name + '/' + event.event_id}>Contact us</a> if you have any questions about the event.
				</p>
				<hr/>
			</div>
			<div className="second_inner">
				<p>
					Based on your interest in Mind & Meditation, you may also enjoy these articles:
				</p>
			</div>
			<div className="recent_articles">
				<article className="recent_article">
					<a href="#" className="recent_article--image">
						<img src="/templates/ArtOfLiving/images/thank-you-article1.png" alt="title" />
					</a>
					<h3 className="recent_article--title">
						<a href="https://www.artofliving.org/us-en/meditation/meditation-for-you/benefits-of-meditation">Benefits of Meditation </a>
					</h3>
					<p>
						The Health Benefits of Meditation From the medical community to the yoga community, the verdict is out: you need to meditate! Recent studies from Harvard
					</p>
					<div>
						<a href="https://www.artofliving.org/us-en/meditation/meditation-for-you/benefits-of-meditation" className="read_more">
							Read more
						</a>
					</div>
				</article>
				<article className="recent_article">
					<a href="#" className="recent_article--image">
						<img src="/templates/ArtOfLiving/images/thank-you-article2.png" alt="title" />
					</a>
					<h3 className="recent_article--title">
						<a href="https://www.artofliving.org/us-en/7-attitudes-truly-happy-people">7 Attitudes of Truly  Happy People </a>
					</h3>
					<p>
						1. Is being stressed a sign of prosperity,  growth, or dignity?
					</p>
					<div>
						<a href="https://www.artofliving.org/us-en/7-attitudes-truly-happy-people" className="read_more">
							Read more
						</a>
					</div>
				</article>
				<article className="recent_article">
					<a href="#" className="recent_article--image">
						<img src="/templates/ArtOfLiving/images/thank-you-article3.png" alt="title" />
					</a>
					<h3 className="recent_article--title">
						<a href="https://www.artofliving.org/us-en/yoga/sun-salutations">Sun Salutation Yoga  Sequence (Surya Namaskar) </a>
					</h3>
					<p>
						Change is hard and most of us resist any change. Even though change may be
					</p>
					<div>
						<a href="https://www.artofliving.org/us-en/yoga/sun-salutations" className="read_more">
							Read more
						</a>
					</div>
				</article>
			</div>
		</section>
		</div>
	  );
  }
};


const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};


const connectedContainer = connect(mapStateToProps)(ThankYou);
const RoutedContainer = withRouter(connectedContainer);
export default RoutedContainer;
