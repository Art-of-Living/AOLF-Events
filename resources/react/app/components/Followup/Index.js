import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import { withRouter } from 'react-router' 
import Header from './Header';
import Footer from './Footer';

class Index extends React.Component {	

	constructor(props) {
		super(props);
	}
	
	componentDidMount(){
		this.loadGoogleMap();
		
		//console.log(this.slider_days.prev);
		
		if ($(this.slider_days).length){
			$(this.slider_days).slick({
				arrows: true,
				prevArrow: $(this.slider_days_prev),
				nextArrow: $(this.slider_days_next),
				dots: false,
				infinite: true,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 5000,
				slidesToShow: 3,
				slidesToScroll: 1,
				slide: '.slide',
				responsive: [
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 2
					}
				}
				]
			});
		}
		
		$('.matchHeight').matchHeight();
		
	}
	
	loadGoogleMap(){
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
		  // How zoomed in you want the map to start at (always required)
		  zoom: 15,

		  // The latitude and longitude to center the map (always required)
		  center: new google.maps.LatLng(34.0443534, -118.2566349), // New York

		  // How you would like to style the map.
		  // This is where you would paste any style found on Snazzy Maps.
		  styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
		};

		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('map');

		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(34.0443534, -118.2566349),
			map: map,
			title: 'Snazzy!'
		});
	}
	
  
    render() {	
		 return (
			<div>
			<Header />
			<section className="map_section">
				<div className="map_overlay"></div>
				<div className="map_popup">
					<div className="map_popup--header">
						<span className="distance">
							1.9 mi
						</span>
						<h5 className="map_item--title">
							Aman Goyal’s House
						</h5>
						<span className="address">
							1455 Kentucky Ave S, <br />
							Los Ageles, CA 00090
						</span>
						<span className="date">
							Tueday, December 25th, 7pm
						</span>
					</div>
					<div className="map_popup--middle">
						<div className="popup_slider">
							<div className="slider_days" ref={(ele) => this.slider_days = ele}>
								<div className="prev_btn arrow_bnts" ref={(ele) => this.slider_days_prev = ele}>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'>
										<path d='M759.2,548.5L337.8,969.9c-26.8,26.8-70.3,26.8-97.1,0c-26.8-26.8-26.8-70.3,0-97.1L613.6,500L240.8,127.2c-26.8-26.8-26.8-70.3,0-97.1c26.8-26.8,70.2-26.8,97.1,0l421.4,421.4c13.4,13.4,20.1,31,20.1,48.5C779.3,517.6,772.6,535.1,759.2,548.5z'
										/>
									</svg>
								</div>
								<div className="next_btn arrow_bnts" ref={(ele) => this.slider_days_next = ele}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
										<path d="M759.2,548.5L337.8,969.9c-26.8,26.8-70.3,26.8-97.1,0c-26.8-26.8-26.8-70.3,0-97.1L613.6,500L240.8,127.2c-26.8-26.8-26.8-70.3,0-97.1c26.8-26.8,70.2-26.8,97.1,0l421.4,421.4c13.4,13.4,20.1,31,20.1,48.5C779.3,517.6,772.6,535.1,759.2,548.5z"
										/>
									</svg>
								</div>
								<div className="slide">
									<h3>
										Tue
									</h3>
									<span className="time">
										December 25th <br />
										7 pm
									</span>
								</div>
								<div className="slide">
									<h3>
										Tue
									</h3>
									<span className="time">
										December 25th <br />
										7 pm
									</span>
								</div>
								<div className="slide">
									<h3>
										Tue
									</h3>
									<span className="time">
										December 25th <br />
										7 pm
									</span>
								</div>
								<div className="slide">
									<h3>
										Tue
									</h3>
									<span className="time">
										December 25th <br />
										7 pm
									</span>
								</div>
							</div>
						</div>
						<div className="popup_slider--caption">
							<span>
								25 people are coming on Tuesday, December 7th
							</span>
						</div>
					</div>
					<div className="map_popup--bottom">
						<form action="#" method="get">
							<div className="form_buttons">
								<a href="#" className="fb">
									RSVP via Facebook
								</a>
								<a href="#" className="gp">
									RSVP via Google+
								</a>
							</div>
							<span className="msg text-center">
								or fill out the form to reserve your spot
							</span>
							<label>
								<input type="text" name="" placeholder="Full name" required="required" />
							</label>
							<label>
								<input type="email" name="" placeholder="Email address" required="required" />
							</label>
							<label>
								<input type="text" name="" placeholder="Phone number" />
							</label>
							<label className="subscribe">
								<input type="checkbox" name="" value="" />
								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
										<path d="M374.7,699.2c12.6-16.1,19.3-26.6,27.8-35.3c154.1-159.1,308.4-318,462.7-477c7.8-8,15.4-16.4,24.3-23c26.7-19.8,59.8-17.2,82.4,5.6c21.4,21.6,24.2,53.8,6.3,79.9c-5,7.3-11.4,13.8-17.6,20.2C784.6,451,608.5,632.4,432.2,813.7c-48,49.4-75.5,47.1-121.2-3.5C218,707.3,123.3,605.9,29.6,503.7C0.7,472.3,4.1,438,37.6,411.6c29-22.9,57.7-21.3,83,5.9c76.1,82,151.9,164.3,227.5,246.7C356.4,673.1,363,683.6,374.7,699.2z"
										/>
									</svg>
									Subscribe to Sudarshan Kriya follow-up uplates (Coming Soon)
								</span>
							</label>
							<button>
								RSVP
							</button>
						</form>
					</div>
				</div>

				<div id="map" className="map_area"></div>
				<div className="map_sidebar">
					<div className="map_sidebar__btn"></div>
					<form>
						<input type="text" name="" />
						<button>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
								<path d="M969.4,879.8L713.6,623.9c45.7-64,73.1-141.6,73.1-223.9c0-214.7-173.6-388.3-388.3-388.3C183.6,11.7,10,185.3,10,400.1c0,214.7,173.6,388.3,388.3,388.3c82.2,0,159.9-27.4,223.9-73.1l255.9,255.8c22.8,22.8,64,22.8,91.4,0l0,0C996.9,943.7,996.9,907.2,969.4,879.8z M398.3,697c-164.5,0-297-132.5-297-297c0-164.5,132.5-297,297-297c164.5,0,297,132.5,297,297C695.3,564.5,562.8,697,398.3,697z"
								/>
							</svg>
						</button>
						<div className="radio_items">
							<label>
								<input type="radio" name="map_radio" value="by_distance" />
								<span>Sort by distance</span>
							</label>
							<label>
								<input type="radio" name="map_radio" value="by_date" />
								<span>Sort by date and time</span>
							</label>
						</div>
					</form>
					<div className="map_items_sect">
						<div className="map_item">
							<span className="arrow_link">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
									<path d="M759.2,548.5L337.8,969.9c-26.8,26.8-70.3,26.8-97.1,0c-26.8-26.8-26.8-70.3,0-97.1L613.6,500L240.8,127.2c-26.8-26.8-26.8-70.3,0-97.1c26.8-26.8,70.2-26.8,97.1,0l421.4,421.4c13.4,13.4,20.1,31,20.1,48.5C779.3,517.6,772.6,535.1,759.2,548.5z"
									/>
								</svg>
							</span>
							<span className="distance">
								0.9 mi
							</span>
							<h5 className="map_item--title">
								Anna Kiryanova’s House
							</h5>
							<span className="address">
								1455 Kentucky Ave S, <br />
								Los Ageles, CA 00090
							</span>
							<span className="date">
								Saturday, Dec 20th, 5pm
							</span>
						</div>
						<div className="map_item">
							<span className="arrow_link">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
									<path d="M759.2,548.5L337.8,969.9c-26.8,26.8-70.3,26.8-97.1,0c-26.8-26.8-26.8-70.3,0-97.1L613.6,500L240.8,127.2c-26.8-26.8-26.8-70.3,0-97.1c26.8-26.8,70.2-26.8,97.1,0l421.4,421.4c13.4,13.4,20.1,31,20.1,48.5C779.3,517.6,772.6,535.1,759.2,548.5z"
									/>
								</svg>
							</span>
							<span className="distance">
								1.9 mi
							</span>
							<h5 className="map_item--title">
								Aman Goyal’s House
							</h5>
							<span className="address">
								1455 Kentucky Ave S, <br />
								Los Ageles, CA 00090
							</span>
							<span className="date">
								Tueday, Dec 25th, 7pm
							</span>
						</div>
						<div className="map_item">
							<span className="arrow_link">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
									<path d="M759.2,548.5L337.8,969.9c-26.8,26.8-70.3,26.8-97.1,0c-26.8-26.8-26.8-70.3,0-97.1L613.6,500L240.8,127.2c-26.8-26.8-26.8-70.3,0-97.1c26.8-26.8,70.2-26.8,97.1,0l421.4,421.4c13.4,13.4,20.1,31,20.1,48.5C779.3,517.6,772.6,535.1,759.2,548.5z"
									/>
								</svg>
							</span>
							<span className="distance">
								2.1 mi
							</span>
							<h5 className="map_item--title">
								Anna Kiryanova’s House
							</h5>
							<span className="address">
								1455 Kentucky Ave S, <br />
								Los Ageles, CA 00090
							</span>
							<span className="date">
								Friday, Dec 26th, 3pm
							</span>
						</div>
						<div className="map_item">
							<span className="arrow_link">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
									<path d="M759.2,548.5L337.8,969.9c-26.8,26.8-70.3,26.8-97.1,0c-26.8-26.8-26.8-70.3,0-97.1L613.6,500L240.8,127.2c-26.8-26.8-26.8-70.3,0-97.1c26.8-26.8,70.2-26.8,97.1,0l421.4,421.4c13.4,13.4,20.1,31,20.1,48.5C779.3,517.6,772.6,535.1,759.2,548.5z"
									/>
								</svg>
							</span>
							<span className="distance">
								5.8 mi
							</span>
							<h5 className="map_item--title">
								Art of Living Center
							</h5>
							<span className="address">
								1455 Kentucky Ave S, <br />
								Los Ageles, CA 00090
							</span>
							<span className="date">
								Sunday, Dec 30th, 8am
							</span>
						</div>
					</div>
					<div className="map_items_navigation">
						<span>
							Showing 1 to 5 of 10
						</span>
						<a href="#" className="prev">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
								<path d="M750.7,922.6c15.3,15.4,15.3,40.3,0,55.8c-15.3,15.4-39.9,15.4-55.2,0L249.3,527.9c-15.3-15.4-15.3-40.4,0-55.8L695.5,21.6c15.3-15.4,39.9-15.4,55.2,0c15.3,15.4,15.3,40.3,0,55.8L343.9,500L750.7,922.6L750.7,922.6L750.7,922.6z"
								/>
							</svg>
						</a>
						<a href="#" className="next">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
								<path d="M750.7,922.6c15.3,15.4,15.3,40.3,0,55.8c-15.3,15.4-39.9,15.4-55.2,0L249.3,527.9c-15.3-15.4-15.3-40.4,0-55.8L695.5,21.6c15.3-15.4,39.9-15.4,55.2,0c15.3,15.4,15.3,40.3,0,55.8L343.9,500L750.7,922.6L750.7,922.6L750.7,922.6z"
								/>
							</svg>
						</a>
					</div>
				</div>
			</section>
			<section className="about_section" style={{backgroundImage : "url(/templates/followup/images/about_sect_bg.png)"}} >
				<div className="row">
					<div className="col-md-12">
						<h2 className="about_section--title">
							About The Sudarshan Kriya
						</h2>
					</div>
				</div>
				<div className="row flex">
					<div className="col-sm-6 text-center">
						<img src="/templates/followup/images/about_img1.png" alt="image" />
					</div>
					<div className="col-sm-6">
						<div className="about_section_cont">
							<p>
								Sudarshan Kriya is a powerful yet simple rhythmic breathing technique that incorporates specific natural rhythms of the breath, harmonizing the body, mind and emotions.
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6 col-sm-push-6 about_section_text">
						<span>
							Over 70 independent studies conducted on four continents and published in peer-reviewed journals, have demonstrated a comprehensive range of benefits from practicing SKY taught on the Art of Living Happiness Program.
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8 col-sm-push-3 about_section_text">
						<div className="info_block">
							<div className="info_block--image">
								<img src="/templates/followup/images/info_block_image1.png" alt="image" />
							</div>
							<div className="info_block--content">
								<p>
									Up to 87.5% reduction in stress bio-marker levels (serum cortisol and blood lactate) [4, 6, 14]
								</p>
							</div>
						</div>
						<div className="info_block">
							<div className="info_block--image">
								<img src="/templates/followup/images/info_block_image2.png" alt="image" />
							</div>
							<div className="info_block--content">
								<p>
									Relieves depression in 67-73% of participants within one month (across over a dozen studies). [2, 4, 8-14]
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-11 col-sm-push-1 about_center_block">
						<p>
							In our study, veterans’ PTSD scores normalized within a week of practicing yogic breathing, and the benefits remain as much as 1 year later, suggesting permanent improvement.
						</p>
						<span>
							International Association<br />
							for Human Values
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8 col-sm-push-3 about_section_text">
						<div className="info_block">
							<div className="info_block--image">
								<img src="/templates/followup/images/info_block_image3.png" alt="image" />
							</div>
							<div className="info_block--content">
								<p>
									Relieves anxiety in 71% of individuals for whom medication and psychotherapy treatments had failed. [1]
								</p>
							</div>
						</div>
						<div className="info_block">
							<div className="info_block--image">
								<img src="/templates/followup/images/info_block_image4.png" alt="image" />
							</div>
							<div className="info_block--content">
								<p>
									3x more time spent in deep restful stages of sleep.
								</p>
							</div>
						</div>
						<div className="info_block">
							<div className="info_block--image">
								<img src="/templates/followup/images/info_block_image5.png" alt="image" />
							</div>
							<div className="info_block--content">
								<p>
									Greater mental focus in regular practitioners (significantly greater EEG Beta wave activity) [20]
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 about_section--bottom">
						<p>
							Disclaimer: The Happiness Program is for overall well-being and rejuvenation. The information contained above contains results from research studies, many of which are based on an adaptation of The Happiness Program to special needs groups. The Happiness Program is not designed to treat or alleviate clinical symptoms. If you suspect you may have a clinical condition, consult your health care professional for treatment.
						</p>
					</div>
				</div>
			</section>
			<section className="foundation_sect">
				<div className="row">
					<div className="col-md-12">
						<h2 className="foundation_sect--title">
							The Art of Living Foundation
						</h2>
					</div>
					<div className="col-md-3 col-sm-6">
						<div className="foundation_block">
							<div className="foundation_block--image matchHeight">
								<img src="/templates/followup/images/foundation1.png" alt="image" />
							</div>
							<p>
								<strong>155 Countries</strong>
								where our programs made a difference
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6">
						<div className="foundation_block">
							<div className="foundation_block--image matchHeight">
								<img src="/templates/followup/images/foundation2.png" alt="image" />
							</div>
							<p>
								<strong>3,000+ centers</strong>
								worldwide with weekly practice groups
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6">
						<div className="foundation_block">
							<div className="foundation_block--image matchHeight">
								<img src="/templates/followup/images/foundation3.png" alt="image" />
							</div>
							<p>
								<strong>35 years</strong>
								of service to society
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6">
						<div className="foundation_block">
							<div className="foundation_block--image matchHeight">
								<img src="/templates/followup/images/foundation4.png" alt="image" />
							</div>
							<p>
								<strong>370M+ lives touched</strong>
								through our cources and events
							</p>
						</div>
					</div>
				</div>
			</section>
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

const connectedContainer = connect(mapStateToProps)(Index);
const RoutedContainer = withRouter(connectedContainer);
export default RoutedContainer;
