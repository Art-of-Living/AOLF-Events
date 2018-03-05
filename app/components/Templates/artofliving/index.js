import React from 'react';
import Header from './header';
import { connect } from 'react-redux'
import Footer from './footer';
import Contact from './contact';
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router' 

class Index extends React.Component {	
	constructor(props) {
		super(props)
	}

	componentWillMount(){
		this.props.dispatch({type : 'title', title : this.props.data.event_name});
	}
	
	onClickPlayButton (event){
		event.preventDefault();
		$('.video_block--img').hide(200);
	}
	
	componentWillUnmount() {
		$('body').removeClass('theme-artofliving');
	}
	 
	componentDidMount(){
		this.renderMap();
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			$('body').addClass('ios theme-artofliving');
		} else{
			$('body').addClass('web theme-artofliving');
		};
		
		$('body').removeClass('loaded');
		
		$('input, textarea').each(function(){
			var placeholder = $(this).attr('placeholder');
			$(this).focus(function(){ $(this).attr('placeholder', '');});
			$(this).focusout(function(){
				$(this).attr('placeholder', placeholder);
			});
		});
	
		$(".fancybox").fancybox();

		$(".descktop_video_btn").fancybox({
            'titlePosition'     : 'inside',
            'transitionIn'      : 'none',
            'transitionOut'     : 'none',
			helpers: {
				overlay: {
				  locked: false
				}
			}
        });

		//Make elements equal height
		$('.matchHeight').matchHeight();
		//$('.get_tast__block--img').matchHeight();
		$('.get_tast__block').matchHeight();
		$('.research__block--subtitle').matchHeight();
		
		$(this.reviews__slider).slick({
			arrows: false,
			dots: true,
			infinite: true,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 5000,
			slidesToShow: 1,
			slidesToScroll: 1,
			slide: '.reviews--slide'
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 300) {
				$('.go_top').addClass('visible');
			}
			else{
				$('.go_top').removeClass('visible');
			}
		});
	}
	
	onClickScroll (event){
		event.preventDefault();
		var id  = $(event.currentTarget).attr('href'),
		top = $(id).offset().top;
		window.location.href=id;
	}
	
	renderMap() {
		var event = this.props.data[0];
		var uluru = {lat: parseFloat(event.location.latitude), lng: parseFloat(event.location.longitude)};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 16,
			center: uluru
		});
		var image = "/templates/" + process.env.REACT_TEMPLATE + "/images/marker.png";
		var marker = new google.maps.Marker({
			position: uluru,
			map: map,
			icon: image
		});
	}

  render() {	
	var style = {
		home_banner : {
			"background" : "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/home_banner.jpg) no-repeat scroll 50% 50% / cover"
		},
		video_banner : {
			"background" : "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/video_banner.jpg) no-repeat scroll 50% 50% / cover"
		},
		banner_desk : {
			"background" : "url(/templates/" + process.env.REACT_TEMPLATE + "/images/banner_second_bg.png)"
		},
		highlight : {
			"background" : "url(/templates/" + process.env.REACT_TEMPLATE + "/images/highlight_bg.png)"
		},
		display_none : {
			"display" : "none"
		}
	};
	
	var events = this.props.data;
	var event = this.props.data[0];
	var eventid = this.props.eventid;
	var eventDate = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
	var street_address_2 = "";
	var userDetail = this.props.userDetail;
	
	if(event.address.street_address_2 != "" && event.address.street_address_2 != null){
		var street_address_2 = ', ' + event.address.street_address_2; 
	}
	
    return (
      <div>
		<Helmet>
            <title>{event.event_name}</title>
            <meta name="description" content="Some description." />
			<meta property="og:url" content="Mind & Meditation: FREE Mini Workshop" />
			<meta property="og:title" content="Mind & Meditation: FREE Mini Workshop" />
			<meta property="og:type" content="fitness" />
			<meta property="og:image" content="{{{baseurl}}}templates/ArtOfLiving/images/home_banner_fb.jpg" />
			<meta property="fb:app_id" content="547829512233839" />
			<meta property="og:description" content="Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions." />
        </Helmet>
		<Header/>
			<Contact addClassName="contact-form-mobile show-for-mobile" events={events} eventid={eventid} />
			
			<section className="home_banner hide-for-mobile" style={style.home_banner}>
				<div className="home_banner--caption">
					<h1 className="home_banner--top_title">
					{event.event_name}
					</h1>
					<h6 className="home_banner--top_subtitle">
					{event.address.city}
					</h6>
					<div className="home_banner--desk" style={style.banner_desk}>
						<h2 className="home_banner--center_title">
							Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions.
						</h2>
						<div className="home_banner--text">
							<p>
								Join this FREE introductory workshop to the world-renowned Happiness Program
							</p>
						</div>
						<a href="#chose_day" onClick={this.onClickScroll} className="btn btn-lg">
							Choose a date & Time
						</a>
					</div>
				</div>
			</section>
			
			<section className="home_banner_mobile show-for-mobile">
				<img height="300" width="100%" src={"/templates/" + process.env.REACT_TEMPLATE + "/images/mobile_banner.jpg"} alt="img"/>
			</section>
			
			<section className="map_section clearfix show-for-mobile">
				<div className="map_section__content">
					<h2 className="map_section--title">
						Event Location
					</h2>
					<p className="hide-for-mobile">
						{event.address.street_address_1}{street_address_2}<br/>
						{event.address.city}, {event.address.state}<br/>
						{event.address.country}<br/>
						{event.address.zipcode}<br/>
					</p>
					<p className="show-for-mobile">
						{event.address.street_address_1}{street_address_2}<br/>
						{event.address.city}, {event.address.state}, {event.address.country}<br/>						
						{event.address.zipcode}<br/>
					</p>
					<a href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(event.address.street_address_1 + street_address_2 +" "+ event.address.city +" "+ event.address.state +" "+ event.address.country +" "+ event.address.zipcode)} className="show-on-map show-for-mobile" target="_blank">
						View on a map
					</a>
				</div>
			</section>
			
			<section className="get_tast_mobile show-for-mobile">
				<h2>
					Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions.
				</h2>
				<div>
					<p>
						Join this FREE introductory workshop to the world-renowned Happiness Program
					</p>
				</div>
				<h2 className="get_taste">
					Get a taste of...
				</h2>
			</section>
			
			<section className="get_tast">
				<div className="row">
					<div className="col-md-12">
						<h2 className="get_tast--title hide-for-mobile">
							get a taste of
						</h2>

						<div className="get_tast__container">
							<div className="get_tast__block">
								<div className="inner">
									<div className="get_tast__block--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block1.png"} alt="img" />
									</div>
									<h3 className="get_tast__block--title matchHeight">
										Mind Mastery
									</h3>
									<p>
										How to quiet your mind and deal with negative thoughts and emotions
									</p>
								</div>
							</div>
							<div className="get_tast__block">
								<div className="inner">
									<div className="get_tast__block--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block2.png"} alt="img" />
									</div>
									<h3 className="get_tast__block--title matchHeight">
										Yogic Breathing techniques
									</h3>
									<p>
										The power of breathing techniques - The quickest, most effective way to dive deep into meditation and reduce stress
									</p>
								</div>
							</div>
							<div className="get_tast__block">
								<div className="inner">
									<div className="get_tast__block--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block3.png"} alt="img" />
									</div>
									<h3 className="get_tast__block--title matchHeight">
										Guided Meditation
									</h3>
									<p>
										An effortless guided meditation - get rested and centered
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="logos_sect">
				<div className="row logos_sect--container">
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos1.png"} alt="logo" />
							<p>
								"Life <br /> Changing"
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos4.png"} alt="logo" />
							<p>
								"May be the fastest growing spiritual practice on the planet"
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos2.png"} alt="logo" />
							<p>
								"Shows promise in providing relief for depression"
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos3.png"} alt="logo" />
							<p>
								"Like Fresh air to millions"
							</p>
						</div>
					</div>
					<div className="row show-for-mobile">
						<a href="#chose_day" onClick={this.onClickScroll} className="btn btn-lg">
							Choose a Date & Time
						</a>
					</div>
				</div>
			</section>
			<Contact addClassName="hide-for-mobile" events={events} eventid={eventid} />
			<section className="map_section clearfix hide-for-mobile">
				<div className="map_section__content">
					<h2 className="map_section--title">
						Event Location
					</h2>
					<p>
						{event.address.street_address_1}{street_address_2}<br/>
						{event.address.city}, {event.address.state}<br/>
						{event.address.country}<br/>
						{event.address.zipcode}<br/>
					</p>
					<a href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(event.address.street_address_1 + street_address_2 +" "+ event.address.city +" "+ event.address.state +" "+ event.address.country +" "+ event.address.zipcode)} className="show-on-map show-for-mobile" target="_blank">
						Show on map
					</a>
					<div className="map_section--direction-icon">
						<a target="_blank" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(event.address.street_address_1 + street_address_2 +" "+ event.address.city +" "+ event.address.state +" "+ event.address.country +" "+ event.address.zipcode +"&dirflg=d")}><img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/sports-car.png"}/></a>
						<a target="_blank" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(event.address.street_address_1 + street_address_2 +" "+ event.address.city +" "+ event.address.state +" "+ event.address.country +" "+ event.address.zipcode +"&dirflg=r")}><img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/underground.png"}/></a>
						<a target="_blank" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(event.address.street_address_1 + street_address_2 +" "+ event.address.city +" "+ event.address.state +" "+ event.address.country +" "+ event.address.zipcode +"&dirflg=w")}><img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/man-walking-directions-button.png"}/></a>
						<a target="_blank" href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(event.address.street_address_1 + street_address_2 +" "+ event.address.city +" "+ event.address.state +" "+ event.address.country +" "+ event.address.zipcode +"&dirflg=b")}><img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/youth-bicycle.png"}/></a>
					</div>
				</div>
				<div className="map">
					<div className="ba-map" id="map"></div>
				</div>
			</section>
			<section className="happiness hide-for-mobile">
				<h2 className="happiness__overlay_title">
					The Happiness Program
				</h2>
				<div className="row">
					<div className="col-md-12">
						<h2 className="happiness--title">
							About <span>The Happiness Program</span>
						</h2>
						<p>
							The Happiness program is a transformative 3-day immersion in powerful<br /> breathing techniques and mind mastery. The main technique on<br /> The Happiness Program is called Sudarshan Kriya, a research-backed<br /> breathing technique that has helped millions of people release stress,<br /> experience deep meditation, and get back in touch with their true self.
						</p>
					</div>
				</div>
			</section>
			<section className="happiness show-for-mobile">
				<div className="row">
					<div className="col-md-12">
						<h2 className="happiness--title">
							About <span>The Happiness Program</span>
						</h2>
						<p>
							The Happiness program is a transformative 3-day immersion in powerful breathing techniques and mind mastery. The main technique on The Happiness Program is called Sudarshan Kriya, a research-backed breathing technique that has helped millions of people release stress, experience deep meditation, and get back in touch with their true self.
						</p>
					</div>
				</div>
			</section>

			<div className="video_block show-for-mobile">
				<div className="video_block--img" style={style.video_banner}>
					<a href="#" className="video_section--btn hide-for-mobile mobile_play_btn" onClick={this.onClickPlayButton}>
						<span className="icon">
							<i className="fa fa-play-circle" aria-hidden="true"></i>
						</span>
						Watch Trailer
					</a>
					<a href="#" className="video_section--btn show-for-mobile mobile_play_btn" onClick={this.onClickPlayButton}>
						<span className="icon">
							<i className="fa fa-play-circle" aria-hidden="true"></i>
						</span>
					</a>
				</div>
				<div className="videoWrapper">
				<iframe src="https://player.vimeo.com/video/241456461?title=0&byline=0&portrait=0" width="100%"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
				</div>
			</div>
			<section className="video_section hide-for-mobile" style={style.home_banner}>
				<div className="row video_section_row">
					<div className="col-sm-6">
						<div className="video_section--title">
							<h3>
								How The Happiness Program is Changing Lives
							</h3>
						</div>
					</div>
					<div className="col-sm-6 video_section--right">
						<a href="#videopopup" className="video_section--btn descktop_video_btn">
							<span className="icon">
								<i className="fa fa-play-circle" aria-hidden="true"></i>
							</span>
							Watch Trailer
						</a>
					</div>
				</div>
			</section>
			<section className="reviews">
				<h4 className="reviews-title-mobile show-for-mobile">
					How The Happiness Program is Changing Lives
				</h4>
				<h2 className="reviews__overlay_title">
					Reviews
				</h2>
				<div className="row">
					<div className="col-md-12">
						<div className="reviews__slider" ref={(ele) => this.reviews__slider = ele}>
							<div className="reviews--slide">
								<div className="slide_content">
									<p>
										It changed my life literally overnight... whenever you find that your mind is agitated or the stress is high, take a moment to take a deep breath in while putting all of yout attention on it.
									</p>
								</div>
								<div className="slide_info hide-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info0.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Louis Gagnon
									</h5>
									<span className="job_position">
										President, Ride.com
									</span>
								</div>
								<div className="slide_info show-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info0.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Louis Gagnon
									</h5>
									<span className="job_position">
										President, Ride.com
									</span>
								</div>
							</div>
							<div className="reviews--slide">
								<div className="slide_content">
									<p>
										Within three days I started experiencing a deep shift within myself from anxiousness to peace, from sadness to joy. As each day progresses, I find myself more and more centered In the joy and clarity of a calm and peaceful existence.
									</p>
								</div>
								<div className="slide_info hide-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info1.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Glenn-Douglas Haig
									</h5>
									<span className="job_position">
										CEO
									</span>
								</div>
								<div className="slide_info show-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info1.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Glenn-Douglas Haig
									</h5>
									<span className="job_position">
										CEO
									</span>
								</div>
							</div>
							<div className="reviews--slide">
								<div className="slide_content">
									<p>
										I have been looking for this for 15 years! The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day.
									</p>
								</div>
								<div className="slide_info hide-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info2.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Charlotte Plus
									</h5>
									<span className="job_position">
										Lawyer
									</span>
								</div>
								<div className="slide_info show-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info2.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Charlotte Plus
									</h5>
									<span className="job_position">
										Lawyer
									</span>
								</div>
							</div>
							<div className="reviews--slide">
								<div className="slide_content">
									<p>
										I felt a huge change in my whole body. After almost three years and nothing working, a simple breathing technique had just changed my life. I now feel amazing. I'm back to the old me and I see the world differently.
									</p>
								</div>
								<div className="slide_info hide-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info3.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Maddy King
									</h5>
									<span className="job_position">
										Model
									</span>
								</div>
								<div className="slide_info show-for-mobile">
									<div className="slide_info--img">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info3.jpg"} alt="img" />
									</div>
									<h5 className="author_title">
										Maddy King
									</h5>
									<span className="job_position">
										Model
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="research">
				<h2 className="research__overlay_title">
					Research
				</h2>
				<div className="row">
					<div className="col-md-12 hide-for-mobile">
						<h2 className="research__title">
							Scientific Research on the <br /> Art of Living Breathing Techniques<span>*</span>
						</h2>
					</div>
					<div className="col-md-12 show-for-mobile">
						<h2 className="research__title">Scientific Research <br /> on the Art of Living <br /> Breathing Techniques</h2>
					</div>
				</div>
				<div className="row research__container">
					<div className="col-md-3 col-sm-6 col-xs-6 research__block">
						<h4 className="research__block--title">
							Deep Sleep
						</h4>
						<span className="research__block--subtitle">Increases</span>
						<span className="percent">218%</span>
						<span className="percent_subtitle">
							Increase
						</span>
						<p>
							In Deep Sleep
						</p>
						<div className="research__block--img">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_up.png"} alt="img" />
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6 research__block">
						<h4 className="research__block--title">
							Well-Being
						</h4>
						<span className="research__block--subtitle"><span>Hormones</span> Increase</span>
						<span className="percent">50%</span>
						<span className="percent_subtitle">
							Increase
						</span>
						<p>
							Serum Prolactin
						</p>
						<div className="research__block--img">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_up.png"} alt="img" />
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6 research__block">
						<h4 className="research__block--title">
							Stress
						</h4>
						<span className="research__block--subtitle down"><span>Hormones</span> Decrease</span>
						<span className="percent down">56%</span>
						<span className="percent_subtitle down">
							Reduction
						</span>
						<p>
							Serum CORTISOL
						</p>
						<div className="research__block--img">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_down.png"} alt="img" />
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6 research__block">
						<h4 className="research__block--title">
							Depression
						</h4>
						<span className="research__block--subtitle down">Decreases</span>
						<span className="percent down">70%</span>
						<span className="percent_subtitle down">
							Remission Rate
						</span>
						<p>
							In Depression in 1 mo
						</p>
						<div className="research__block--img">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_down.png"} alt="img" />
						</div>
					</div>
				</div>
				<div className="row hide-for-mobile">
					<div className="col-md-12">
						<div className="text-center research__bottom_text">
							<p>
								* The Happiness Program is for overall well-being and vitality, rest and rejuvenation. The above results are from independent research studies, based on an adaptation of the standard Happiness Program to special needs groups. The Happiness Program is not designed to treat or alleviate clinical symptoms. If you suspect you may have a clinical condition, consult your health care professional before deciding whether to enroll in our program.
							</p>
						</div>
					</div>
				</div>
			</section>
			
			<section className="highlight hide-for-mobile" style={style.highlight}>
				<div className="row">
					<div className="">
						<div className="highlight--left_block">
							<h2>Mind &   Meditation</h2>
							<h5>Register Now for FREE</h5>
						</div>
						<a href="#chose_day" onClick={this.onClickScroll} className="btn btn-primary pull-right">
							Save my Spot
						</a>
					</div>
				</div>
			</section>
			
			<section className="highlight show-for-mobile" style={style.highlight}>
				<div className="row">
					<div className="col-md-12">
						<div className="highlight--left_block">
							<h2>Mind & Meditation <br/> Workshop</h2>
							<h5>{event.address.city}</h5>
						</div>
						<a href="#chose_day" onClick={this.onClickScroll} className="btn btn-lg">
							REGISTER FOR FREE
						</a>
					</div>
				</div>
			</section>

			<div id="videopopup" style={style.display_none}>
				<div className="videoWrapper">
					<iframe src="https://player.vimeo.com/video/241456461?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
				</div>
			</div>
		<Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

const connectedContainer = connect(mapStateToProps)(Index);
const RoutedContainer = withRouter(connectedContainer);
export default RoutedContainer;