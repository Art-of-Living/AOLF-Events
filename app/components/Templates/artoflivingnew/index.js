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
		$('.video_block--img-1').hide(200);
	}
	
	componentWillUnmount() {
		$('body').removeClass('theme-artofliving');
	}
	 
	componentDidMount(){
		this.renderMap();
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
		} else{
			$('body').addClass('web');
		};
		$('body').removeClass('loaded');
		
		
		$('input, textarea').each(function(){
			var placeholder = $(this).attr('placeholder');
			$(this).focus(function(){ $(this).attr('placeholder', '');});
			$(this).focusout(function(){
				$(this).attr('placeholder', placeholder);
			});
		});
	
		// Sticky footer
		// bumpIt();

		$('select').styler();
		$(".fancybox").fancybox();

		$('.mobile_play_btn').click(function(event) {
			event.preventDefault();
			$('.video_block--img').hide(200);
			$(this).hide();
		});



		 $(".descktop_video_btn").fancybox({
            'titlePosition'     : 'inside',
            'transitionIn'      : 'none',
            'transitionOut'     : 'none'
        });

		 $('.home_banner--top_subtitle .arrow').on("click", function(){
		 	$('.home_banner--locations').toggleClass('hdn');
		 })



		//Make elements equal height
		$('.matchHeight').matchHeight();
		$('.get_tast__block--img').matchHeight();
		$('.get_tast__block').matchHeight();
		$('.research__block--subtitle').matchHeight();
		$('.logos_sect--block').matchHeight();





		$('.reviews__slider').slick({
			// cssEase: 'ease',
			// fade: true,
			arrows: false,
			dots: true,
			infinite: true,
			speed: 500,
			autoplay: false,
			autoplaySpeed: 5000,
			slidesToShow: 1,
			slidesToScroll: 1,
			slide: '.reviews--slide'
		});


		  $('a[href*="#"]').click(function(event) {
			  event.preventDefault();
			  var id  = $(this).attr('href'),
			  top = $(id).offset().top;
			  $('body,html').animate({scrollTop: top}, 1500);
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
	var mobile_contact;
	var style = {
		home_banner : {
			"background" : "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/home_banner.jpg) no-repeat scroll 50% 50% / cover"
		},
		article_banner : {
			"background" : "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/home_banner.jpg)"
		},
		video_banner : {
			"background" : "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/video_banner.jpg) no-repeat scroll 50% 50% / cover"
		},
		get_tast_bg : {
			"background" : "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast_bg.jpg) no-repeat scroll 50% 50% / cover"
		},
		banner_desk : {
			"background" : "url(/templates/" + process.env.REACT_TEMPLATE + "/images/banner_second_bg.png)"
		},
		check : {
			"background" : "url(/templates/" + process.env.REACT_TEMPLATE + "/images/check.png) no-repeat"
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
	
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		mobile_contact = (<Contact id="chose_day_mobile" addClassName="contact-form-mobile show-for-mobile" events={events} eventid={eventid} />);
	}
	
    return (
      <div className="artofliving-container">
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
			{mobile_contact}			
			<section className="home_banner-1" style={style.home_banner}>
				<div className="row-1">
					<div className="col-sm-6">
						<div className="home_banner--caption-1">
							<h1 className="home_banner--top_title-1">
								Mind & Meditation
							</h1>
							<h6 className="home_banner--top_subtitle-1">
								{event.address.city}, CA<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/downarrow.png"}  class="arrow-1"/>
							</h6>
							<span className="home_banner--locations-1">
								<i className="fa fa-map-marker" aria-hidden="true"></i>
								2354 Walsh Ave <br/> 
								Santa Clara, California, 95051
							</span>
							<div className="home_banner--text-1">
								<p>
									Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions.
								</p>
							</div>
						</div>
					</div>
					<div className="">
						<Contact id="chose_day" addClassName="hide-for-mobile" events={events} eventid={eventid} />
					</div>
				</div>
			</section>
			
			
			<section className="home_banner_mobile-1 show-for-mobile">
				<img height="300" width="100%" src={"/templates/" + process.env.REACT_TEMPLATE + "/images/mobile_banner.jpg"} alt="img"/>
			</section>
			
			<section className="map_section-1 clearfix show-for-mobile">
				<div className="map_section__content-1">
					<h2 className="map_section--title-1">
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
			
			<section className="get_tast_mobile-1 show-for-mobile">
				<h2>
					Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions.
				</h2>
				<div>
					<p>
						Join this FREE introductory workshop to the world-renowned Happiness Program
					</p>
				</div>
				<h2 className="get_taste-1">
					Get a taste of...
				</h2>
			</section>
			
			<section className="logos_sect-1 hide-for-mobile">
				<div className="row-1 logos_sect--container-1">
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos1.png"} alt="logo" />
							<p>
								"Life Changing"
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos4.png"} alt="logo" />
							<p>
								"May be the fastest growing spiritual practice on the planet"
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos2.png"} alt="logo" />
							<p>
								"Shows promise in providing relief for depression"
							</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6">
						<div className="logos_sect--block-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/logos3.png"} alt="logo" />
							<p>
								"Like Fresh air to millions"
							</p>
						</div>
					</div>
				</div>
			</section>
			
			<section className="get_tast-1" >
				<div className="row-1">
					<div className="col-md-12" style={style.get_tast_bg}>
						<h2 className="get_tast--title-1">
							Start Exploring These Powerful Techniques
						</h2>

						<div className="get_tast__container-1">
							<div className="get_tast__block-1">
								<div className="inner-1">
									<div className="get_tast__block--img-1">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block1.png"} alt="img" />
									</div>
									<h3 className="get_tast__block--title-1 matchHeight-1">
										Mind Mastery
									</h3>
									<p>
										How to quiet your mind and deal with negative thoughts and emotions
									</p>
								</div>
							</div>
							<div className="get_tast__block-1">
								<div className="inner-1">
									<div className="get_tast__block--img-1">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block2.png"} alt="img" />
									</div>
									<h3 className="get_tast__block--title-1 matchHeight-1">
										Breathing Techniques
									</h3>
									<p>
										The power of breathing techniques - The quickest, most effective way to dive deep into meditation and reduce stress
									</p>
								</div>
							</div>
							<div className="get_tast__block-1">
								<div className="inner-1">
									<div className="get_tast__block--img-1">
										<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block3.png"} alt="img" />
									</div>
									<h3 className="get_tast__block--title-1 matchHeight-1">
										Guided Meditation
									</h3>
									<p>
										Explore an effortless approach to meditation
									</p>
								</div>
							</div>
						</div>
						<div className="get_tast__content-1">
							<h2 className="text-center-1">How This Event Will Help You:</h2>
							<p>
								Tired of being tired? Of feeling behind and overwhelmed? It's normal. Stress piles up and takes a toll on our mood, sleep and relationships.
							</p>
							<p>
								When we feel drained, our mind is less likely to be positive and instead fills up with judgments, doubts, etc, which drains us even more, creating a negative cycle.
							</p>
							<p>
								You probably know meditation can help, but it's hard to make the time, and when you do, you may not be sure if it's "working" and give up.
							</p>
							<p>
								Your own breath hides the secret to living with less stress, greater focus, energy, and confidence. In fact, Vogue recently declared “Breathing is the New Yoga” and a Stanford researcher in Psychology Today called it “An Incredible Alternative to Mindfulness You Never Heard Of”... both referencing Art of Living’s workshops on breathing techniques.
							</p>
							<p>
								This free 60-90 minute session will give you a taste of the power of breath and effortless meditation.
							</p>
							<h4>
								Here are a few things people often experience during the sessions:
							</h4>
							<ul>
								<li style={style.check}>
									A space to slow down, rest and get centered
								</li>
								<li style={style.check}>
									Recharge your energy and enthusiasm
								</li>
								<li style={style.check}>
									Build your resilience and get tools to deal with bad times
								</li>
								<li style={style.check}>
									Tune in to your true self and purpose in life
								</li>
							</ul>
							<p>
								You’ll also get an introduction to the Art of Living Happiness Program - our flagship course that dives deep into the power of breath. For over 35 years, we’ve shared this program with millions of people in 150+ countries with incredible results.
							</p>
						</div>
					</div>
				</div>
			</section>
			
			<section className="simple_section-1">
				<div className="row-1" >
					<div className="col-md-12" style={style.home_banner}>
						<h2 className="simple_section--title-1">Mind & Meditation</h2>
						<h4 className="simple_section--city-1">Los Angeles</h4>
						<div className="simple_section--content-1">
							<p>
								Join this expert-led introductory session to
								the world-renowned Happiness Program
							</p>
							<a href="#" onClick={this.onClickScroll} className="simple_section--btn-1">
								Choose Your Preferred Date & Time
							</a>
						</div>
					</div>
				</div>
			</section>
			
			
			<section className="map_section-1 clearfix hide-for-mobile">	
			</section>
			
			<section className="happiness-1">
				<h2 className="happiness__overlay_title-1">
					The Happiness Program
				</h2>
				<div className="row-1">
					<div className="col-md-12">
						<h2 className="happiness--title-1">
							About <span>The Happiness Program</span>
						</h2>
						<div className="happiness--content-1">
							<p>
								The Happiness Program is a transformative 3-day immersion in powerful breathing techniques and mind mastery. The main technique on <span>The Happiness Program</span> is called <b>Sudarshan Kriya™</b>, a  <a href="https://www.artofliving.org/us-en/research-sudarshan-kriya" target="_blank">research-backed</a> breathing tech nique that has helped millions of people release stress, experience deep meditation, and get back in touch with their true self.
							</p>
						</div>
					</div>
				</div>
			</section>
			
			<section className="happiness-1 show-for-mobile">
				<section className="happiness-1">
					<h2 className="happiness__overlay_title-1">
						The Happiness Program
					</h2>
					<div className="row-1">
						<div className="col-md-12">
							<h2 className="happiness--title-1">
								About <span>The Happiness Program</span>
							</h2>
							<div className="happiness--content-1">
								<p>
									The Happiness Program is a transformative 3-day immersion in powerful breathing techniques and mind mastery. The main technique on <span>The Happiness Program</span> is called <b>Sudarshan Kriya™</b>, a  <a href="https://www.artofliving.org/us-en/research-sudarshan-kriya" target="_blank">research-backed</a> breathing tech nique that has helped millions of people release stress, experience deep meditation, and get back in touch with their true self.
								</p>
							</div>
						</div>
					</div>
				</section>
			</section>
			


			<div className="video_block-1 show-for-mobile">
				<div className="video_block--img-1" style={style.video_banner}>
					<a href="#" className="video_section--btn-1 hide-for-mobile mobile_play_btn" onClick={this.onClickPlayButton}>
						<span className="icon-1">
							<i className="fa fa-play-circle" aria-hidden="true"></i>
						</span>
						Watch Trailer
					</a>
					<a href="#" className="video_section--btn-1 show-for-mobile mobile_play_btn" onClick={this.onClickPlayButton}>
						<span className="icon">
							<i className="fa fa-play-circle" aria-hidden="true"></i>
						</span>
					</a>
				</div>
				<div className="videoWrapper-1">
				<iframe src="https://player.vimeo.com/video/241456461?title=0&byline=0&portrait=0" width="100%"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
				</div>
			</div>
			
			<section className="video_section-1 hide-for-mobile" style={style.video_banner}>
				<div className="row-1 video_section_row-1">
					<div className="col-sm-6 col-sm-push-6">
						<div className="video_section--title-1">
							<h3>
								How The Happiness Program is Changing Lives
							</h3>
							<a href="#videopopup" className="video_section--btn-1 descktop_video_btn">
								<span className="icon-1">
									<i className="fa fa-play-circle" aria-hidden="true"></i>
								</span>
							</a>
						</div>
					</div>
					<div className="col-sm-6 video_section--right-1 col-sm-pull-6">
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
			
			<section className="research-1">
				<div className="row-1">
					<div className="col-md-12 hide-for-mobile">
						<h2 className="research__title-1">
							Scientific Research on the <br /> Art of Living Breathing Techniques<span>*</span>
						</h2>
					</div>
					<div className="col-md-12 show-for-mobile">
						<h2 className="research__title-1">Scientific Research <br /> on the Art of Living <br /> Breathing Techniques</h2>
					</div>
				</div>
				<div className="row-1 research__container-1">
					<div className="col-md-3 col-sm-6 col-xs-6 research__block-1">
						<h4 className="research__block--title-1">
							Deep Sleep
						</h4>
						<span className="research__block--subtitle-1">Increases</span>
						<span className="percent-1">218%</span>
						<span className="percent_subtitle-1">
							Increase
						</span>
						<p>
							In Deep Sleep
						</p>
						<div className="research__block--img-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_up.png"} alt="img" />
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6 research__block-1">
						<h4 className="research__block--title-1">
							Well-Being
						</h4>
						<span className="research__block--subtitle-1"><span>Hormones</span> Increase</span>
						<span className="percent-1">50%</span>
						<span className="percent_subtitle-1">
							Increase
						</span>
						<p>
							Serum Prolactin
						</p>
						<div className="research__block--img-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_up.png"} alt="img" />
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6 research__block-1">
						<h4 className="research__block--title-1">
							Stress
						</h4>
						<span className="research__block--subtitle-1 down-1"><span>Hormones</span> Decrease</span>
						<span className="percent-1 down-1">56%</span>
						<span className="percent_subtitle-1 down-1">
							Reduction
						</span>
						<p>
							Serum CORTISOL
						</p>
						<div className="research__block--img-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_down.png"} alt="img" />
						</div>
					</div>
					<div className="col-md-3 col-sm-6 col-xs-6 research__block-1">
						<h4 className="research__block--title-1">
							Depression
						</h4>
						<span className="research__block--subtitle-1 down-1">Decreases</span>
						<span className="percent-1 down-1">70%</span>
						<span className="percent_subtitle-1 down-1">
							Remission Rate
						</span>
						<p>
							In Depression in 1 mo
						</p>
						<div className="research__block--img-1">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/arrow_down.png"} alt="img" />
						</div>
					</div>
				</div>
				<div className="row-1 hide-for-mobile">
					<div className="col-md-12">
						<div className="text-center-1 research__bottom_text-1">
							<p>
								* The Happiness Program is for overall well-being and vitality, rest and rejuvenation. The above results are from independent research studies, based on an adaptation of the standard Happiness Program to special needs groups. The Happiness Program is not designed to treat or alleviate clinical symptoms. If you suspect you may have a clinical condition, consult your health care professional before deciding whether to enroll in our program.
							</p>
						</div>
					</div>
				</div>
			</section>
			
			<section className="highlight-1 hide-for-mobile" style={style.highlight}>
				<div className="row-1">
					<div className="col-md-12">
						<h2 className="simple_section--title-1">Mind & Meditation</h2>
						<h4 className="simple_section--city-1">{event.address.city}</h4>
						<div className="simple_section--content-1">
							<p>
								Start exploring these powerful techniques
							</p>
							<a href="#" onClick={this.onClickScroll} className="btn btn-lg simple_section--btn-1">
								Register for Free
							</a>
						</div>
					</div>
				</div>
			</section>
			
			<section className="highlight-1 show-for-mobile" style={style.highlight}>
				<div className="row-1">
					<div className="col-md-12">
						<h2 className="simple_section--title-1">Mind & Meditation</h2>
						<h4 className="simple_section--city-1">{event.address.city}</h4>
						<div className="simple_section--content-1">
							<p>
								Start exploring these powerful techniques
							</p>
							<a href="#" onClick={this.onClickScroll} className="btn btn-lg" className="simple_section--btn-1">
								Register for Free
							</a>
						</div>
					</div>
				</div>
			</section>

			<div id="videopopup" style={style.display_none}>
				<div className="videoWrapper-1">
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