import React from 'react';
import Header from './header';
import { connect } from 'react-redux'
import Footer from './footer';
import Contact from './contact';
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router'
import GoogleTagManager from '../../GoogleTagManager';

class Index extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.dispatch({ type: 'title', title: this.props.data.event_name });
	}

	onClickPlayButton(event) {
		event.preventDefault();
		$('.video_block--img').hide(200);
	}

	componentWillUnmount() {
		$('body').removeClass('theme-artofliving');
	}

	componentDidMount() {

		$(".top").click(function () {
			$("html, body").animate({ scrollTop: 200 }, "fast");
			return false;
		});
		
		this.renderMap();

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			$('body').addClass('ios');
		} else {
			$('body').addClass('web');
		};
		$('body').removeClass('loaded');

		$('input, textarea').each(function () {
			var placeholder = $(this).attr('placeholder');
			$(this).focus(function () { $(this).attr('placeholder', ''); });
			$(this).focusout(function () {
				$(this).attr('placeholder', placeholder);
			});
		});

		$('select').styler();
		$(".fancybox").fancybox();

		$('.mobile_play_btn').click(function (event) {
			event.preventDefault();
			$('.video_block--img').hide(200);
			$(this).hide();
		});

		$(".descktop_video_btn").fancybox({
			'titlePosition': 'inside',
			'transitionIn': 'none',
			'transitionOut': 'none'
		});

		$('.home_banner--top_subtitle--1 .arrow').on("click", function () {
			$(".home_banner--locations--1").toggle();
			$(this).find('img').toggle();
			//$('.home_banner--locations--1').toggleClass('hdn');
		});

		$('#arrow').on("click", function () {
			$(this).find('img').toggle();
		});

		//Make elements equal height
		$('.matchHeight').matchHeight();
		$('.get_tast__block--img').matchHeight();
		$('.get_tast__block').matchHeight();
		$('.research__block--subtitle').matchHeight();
		$('.logos_sect--block').matchHeight();

		$('.reviews__slider--1').slick({
			// cssEase: 'ease',
			// fade: true,
			arrows: false,
			dots: true,
			infinite: true,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 5000,
			slidesToShow: 1,
			slidesToScroll: 1,
			slide: '.reviews--slide--1'
		});


		$('a[href*="#"]').click(function (event) {
			event.preventDefault();
			var id = $(this).attr('href'),
				top = $(id).offset().top;
			$('body,html').animate({ scrollTop: top }, 1500);
		});

		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('.go_top').addClass('visible');
			}
			else {
				$('.go_top').removeClass('visible');
			}
		});
	}

	onClickScroll(event) {
		event.preventDefault();
		var id = $(event.currentTarget).attr('href'),
			top = $(id).offset().top;
		window.location.href = id;
	}

	renderMap() {
		var event = this.props.data[0];
		var uluru = { lat: parseFloat(event.location.latitude), lng: parseFloat(event.location.longitude) };
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
			home_banner: {
				"background": "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/home_banner.jpg) no-repeat scroll 50% 0% / cover"
			},
			home_banner2: {
				"background": "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/home_banner.jpg) no-repeat scroll 50% 0% / cover"
			},
			marker: {
				"background": "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/marker.jpg) no-repeat 50% / !important"
			},
			video_banner: {
				"background": "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/video_banner.jpg) no-repeat scroll 50% 50% / cover"
			},
			banner_desk: {
				"background": "url(/templates/" + process.env.REACT_TEMPLATE + "/images/banner_second_bg.png)"
			},
			highlight: {
				"background": "url(/templates/" + process.env.REACT_TEMPLATE + "/images/highlight_bg.png)"
			},
			display_none: {
				"display": "none"
			},
			get_tast_bg: {
				"background": "rgba(0, 0, 0, 0) url(/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast_bg.jpg) no-repeat scroll 50% 50% / cover"
			},
			check: {
				"background": "url(/templates/" + process.env.REACT_TEMPLATE + "/images/check.png) no-repeat"
			},
			MindMasterycolor: {
				"color": "#02a3a1"
			}
		};

		var events = this.props.data;
		var event = this.props.data[0];
		var eventid = this.props.eventid;
		var eventDate = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
		var street_address_2 = "";
		var userDetail = this.props.userDetail;

		if (event.address.street_address_2 != "" && event.address.street_address_2 != null) {
			var street_address_2 = ', ' + event.address.street_address_2;
		}
		
		return (
			<div className="mm_landing">
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
				<Header />				
				{mobile_contact}
				<GoogleTagManager gtmId='GTM-N2J496' />
				<section className="home_banner--1" style={style.home_banner} >
					<div className="row">
						<div className="col-sm-6">
							<div className="home_banner--caption--1">
								<h1 className="home_banner--top_title--1">
									{event.event_name}
								</h1>
								<h6 id="arrow" className="home_banner--top_subtitle--1">

									{event.address.city}, {event.address.state} <img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/downarrow.png"} className="arrow" />
									<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/uparrow.png"} className="arrow" style={style.display_none} />
								</h6>
								<span className="home_banner--locations--1" style={style.display_none}>
									<i className="fa fa-map-marker" aria-hidden="true"></i>
									{event.address.street_address_1} {street_address_2} <br />
									{event.address.city}, {event.address.state}, {event.address.zipcode}
								</span>
								<div className="home_banner--text--1">
									<p>
										Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions.
						</p>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<Contact id="chose_day" addClassName="hide-for-mobile" events={events} eventid={eventid} />
						</div>
					</div>
				</section>

				<div className="show-for-mobile smpl_img">
					<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/girls image.png"} alt="logo" />
				</div>
				<section className="map_section--1 clearfix show-for-mobile">
					<div className="map_section__content--1">
						<h2 className="map_section--title--1" style={style.marker}>
							Event Location
						</h2>
						{/*
						<p>

							{event.address.street_address_1} {street_address_2} <br />
							{event.address.city}, {event.address.state}, {event.address.zipcode}
						</p>
						<a href="https://www.google.com.ua/maps?q=2354+Walsh+Ave+Santa+Clara+California+United+States+95051&um=1&ie=UTF-8&sa=X&ved=0ahUKEwjo5YbXlKrXAhXsL8AKHYyGAa0Q_AUICigB" className="show-on-map show-for-mobile" target="_blank">
							Show on map
						</a>
						*/}
						<p className="show-only-for-mobile">
							{event.address.street_address_1}{street_address_2}<br />
							{event.address.city}, {event.address.state}, {event.address.country}<br />
							{event.address.zipcode}<br />
						</p>
						<a href={"https://maps.google.com/?saddr=Current+Location&daddr=" + encodeURI(event.address.street_address_1 + street_address_2 + " " + event.address.city + " " + event.address.state + " " + event.address.country + " " + event.address.zipcode)} className="show-on-map show-for-mobile" target="_blank">
							View on a map
					</a>

					</div>
					<div className="map">
						<div className="ba-map" id="map"></div>
					</div>
				</section>

				<div className="show-for-mobile--1 smpl_text--1">
					<p>
						Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions.
	</p>
				</div>
				<section className="logos_sect--1 hide-for-mobile">
					<div className="row logos_sect--container--1">
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block--1">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/3.png"} alt="logo" />

								<p>
									"Life <br /> Changing"
					</p>
							</div>
						</div>
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block--1">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/4.png"} alt="logo" />

								<p>
									"May be the fastest growing spiritual practice on the planet"
					</p>
							</div>
						</div>
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block--1">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/5.png"} alt="logo" />

								<p>
									"Shows promise in providing relief for depression"
					</p>
							</div>
						</div>
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block--1">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/6.png"} alt="logo" />
								<p>
									"Like Fresh air to millions"
					</p>
							</div>
						</div>
					</div>
				</section>

				<section className="get_tast--1">
					<div className="row">
						<div className="col-md-12" >
							<h2 className="get_tast--title--1">
								Start Exploring These Powerful Techniques
				</h2>

							<div className="get_tast__container--1">
								<div className="get_tast__block--1">
									<div className="inner">
										<div className="get_tast__block--img--1">
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block1.png"} alt="img" className="mobile" />
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block1_black.png"} alt="img" className="desktop" />
										</div>
										<h3 class="get_tast__block--title--1 matchHeight" style={style.MindMasterycolor} >
											Mind Mastery
							</h3>
										<p>
											How to quiet your mind and deal with negative thoughts and emotions
							</p>
									</div>
								</div>
								<div className="get_tast__block--1">
									<div className="inner">
										<div className="get_tast__block--img--1">
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block2.png"} alt="img" className="mobile" />
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block2_black.png"} alt="img" className="desktop" />
										</div>
										<h3 className="get_tast__block--title--1 matchHeight">
											Breathing Techniques
							</h3>
										<p>
											The power of breathing techniques - The quickest, most effective way to dive deep into meditation and reduce stress
							</p>
									</div>
								</div>
								<div className="get_tast__block--1">
									<div className="inner">
										<div className="get_tast__block--img--1">
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block3.png"} alt="img" className="mobile" />
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/get_tast__block3_black.png"} alt="img" className="desktop" />

										</div>
										<h3 className="get_tast__block--title--1 matchHeight">
											Guided Meditation
							</h3>
										<p>
											Explore an effortless approach to meditation
							</p>
									</div>
								</div>
							</div>
							<div className="get_tast__content--1">
								<h2 className="text-center--1">How This Event Will Help You:</h2>
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
								<br />
								<h4>
									Here are a few things people often experience during the sessions:
					</h4>
								<ul>
									<li style={style.check} >
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

				<section className="logos_sect show-for-mobile">
					<div className="row logos_sect--container">
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/3.png"} alt="img" />
								<p>
									"Life <br /> Changing"
					</p>
							</div>
						</div>
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/4.png"} alt="img" />
								<p>
									"May be the fastest growing spiritual practice on the planet"
					</p>
							</div>
						</div>
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/5.png"} alt="img" />
								<p>
									"Shows promise in providing relief for depression"
					</p>
							</div>
						</div>
						<div className="col-md-3 col-sm-6 col-xs-6">
							<div className="logos_sect--block">
								<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/6.png"} alt="img" />
								<p>
									"Like Fresh air to millions"
					</p>
							</div>
						</div>
					</div>
				</section>
				<section className="simple_section--1" style={style.home_banner2} >
					<div className="row">
						<div className="col-md-12">
							<h2 className="simple_section--title--1">Mind & Meditation</h2>
							<h4 className="simple_section--city--1">Los Angeles</h4>
							<div className="simple_section--content--1">
								<p>
									Join this expert-led introductory session to
									the world-renowned Happiness Program
					</p>
								<a id="top" href="#" className="simple_section--btn--1 top">
									Choose Your Preferred Date & Time
					</a>
							</div>
						</div>
					</div>
				</section>
				<section className="happiness--1">
					<h2 className="happiness__overlay_title--1">
						The Happiness Program
		</h2>
					<div className="row">
						<div className="">
							<h2 className="happiness--title--1">
								About <span>The Happiness Program</span>
							</h2>
							<div className="happiness--content">
								<p>
									The Happiness Program is a transformative 3-day immersion in powerful breathing techniques and mind mastery. The main technique in <span>The Happiness Program</span> is called <b>Sudarshan Kriya™</b>, a  <a href="https://www.artofliving.org/us-en/research-sudarshan-kriya" target="_blank">research-backed</a> breathing technique that has helped millions of people release stress, experience deep meditation, and get back in touch with their true self.
					</p>
							</div>
						</div>
					</div>
				</section>
				<section className="video_section hide-for-mobile" style={style.video_banner} >
					<div className="row video_section_row">
						<div className="col-sm-6 col-sm-push-6">
							<div className="video_section--title--1 hide-for-mobile">
								<h3>
									How The Happiness Program is Changing Lives
					</h3>
								<a href="#videopopup" className="video_section--btn descktop_video_btn">
									<span className="icon">
										<i className="fa fa-play-circle" aria-hidden="true"></i>
									</span>
								</a>
							</div>
						</div>
						<div className="col-sm-6 video_section--right col-sm-pull-6">
						</div>
					</div>
				</section>

				<div className="video_block show-for-mobile">
					<div className="video_block--img" style={style.video_banner}>

					</div>
					<div className="videoWrapper">
						<iframe src="https://player.vimeo.com/video/241456461?title=0&byline=0&portrait=0" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
					</div>
					<div className="mob_sect_btn_block row show-for-mobile">
						<div className="col-md-12">
							<a href="#" className="video_section--btn mobile_play_btn">
								<span className="icon">
									<i className="fa fa-play-circle" aria-hidden="true"></i>
								</span>
							</a>
						</div>
					</div>
				</div>
				<div className="video_section--title--1 show-for-mobile mobtext">
					<h3>
						How The Happiness Program is Changing Lives
		</h3>
				</div>

				<section className="reviews--1">
					<h2 className="reviews__overlay_title--1">
						Reviews
		</h2>
					<div className="row">
						<div className="col-md-12">
							<div className="reviews__slider--1" ref={(ele) => this.reviews__slider = ele}>
								<div className="reviews--slide--1">
									<h4 className="show-for-mobile">
										How The Happiness Program is Changing Lives
						</h4>
									<div className="slide_content--1">
										<p>
											It changed my life literally overnight... whenever you find that your mind is agitated or the stress is high, take a moment to take a deep breath in while putting all of your attention on it.
							</p>
									</div>
									<div className="slide_info--1">
										<div className="slide_info--img--1">
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info0.png"} alt="img" />
										</div>
										<h5 className="author_title--1">
											Louis Gagnon
							</h5>
										<span className="job_position--1">
											President, <a href="#">Ride.com</a>
										</span>
									</div>
								</div>
								<div className="reviews--slide--1">
									<h4 className="show-for-mobile">
										How The Happiness Program is Changing Lives
						</h4>
									<div className="slide_content--1">
										<p>
											Within three days I started experiencing a deep shift within myself from anxiousness to peace, from sadness to joy. As each day progresses, I find myself more and more centered In the joy and clarity of a calm and peaceful existence.
							</p>
									</div>
									<div className="slide_info--1">
										<div className="slide_info--img--1">
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info1.jpg"} alt="img" />
										</div>
										<h5 className="author_title--1">
											Glenn-Douglas Haig
							</h5>
										<span className="job_position--1">
											CEO
							</span>
									</div>
								</div>
								<div className="reviews--slide--1">
									<h4 className="show-for-mobile">
										How The Happiness Program is Changing Lives
						</h4>
									<div className="slide_content--1">
										<p>
											I have been looking for this for 15 years! The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day.
							</p>
									</div>
									<div className="slide_info--1">
										<div className="slide_info--img--1">
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info2.jpg"} alt="img" />
										</div>
										<h5 className="author_title--1">
											Charlotte Plus
							</h5>
										<span className="job_position--1">
											Lawyer
							</span>
									</div>
								</div>
								<div className="reviews--slide--1">
									<h4 className="show-for-mobile">
										How The Happiness Program is Changing Lives
						</h4>
									<div className="slide_content--1">
										<p>
											I felt a huge change in my whole body. After almost three years and nothing working, a simple breathing technique had just changed my life. I now feel amazing. I'm back to the old me and I see the world differently.
							</p>
									</div>
									<div className="slide_info--1">
										<div className="slide_info--img--1">
											<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/slide_info3.jpg"} alt="img" />
										</div>
										<h5 className="author_title--1">
											Maddy King
							</h5>
										<span className="job_position--1">
											Model
							</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="research--1">
					<div className="row">
						<div className="col-md-12">
							<h2 className="research__title--1">
								Scientific Research on the <br />Art of Living Breathing Techniques<span>*</span>
							</h2>
						</div>
					</div>
					<div className="row research__container--1">
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
					<div className="row">
						<div className="col-md-12">
							<div className="text-center research__bottom_text">
								<p>
									* The Happiness Program is for overall well-being and vitality, rest and rejuvenation. The above results are from independent research studies, based on an adaptation of the standard Happiness Program to special needs groups. The Happiness Program is not designed to treat or alleviate clinical symptoms. If you suspect you may have a clinical condition, consult your health care professional before deciding whether to enroll in our program.
					</p>
							</div>
						</div>
					</div>
				</section>
				<section className="simple_section--1" style={style.home_banner2}>
					<div className="row">
						<div className="col-md-12">
							<h2 className="simple_section--title--1">Mind & Meditation</h2>
							<h4 className="simple_section--city--1">Los Angeles</h4>
							<div className="simple_section--content--1">
								<p>
									Start exploring these powerful techniques
					</p>
								<a href="#" onClick={this.onClickScroll} className="simple_section--btn--1 top">
									Register for Free
					</a>
							</div>
						</div>
					</div>
				</section>
				<div id="videopopup" style={style.display_none} >
					<div class="videoWrapper">
						<iframe id="cartoonVideo" width="640" height="360" src="https://player.vimeo.com/video/241456461" frameborder="0" allowfullscreen=""></iframe>
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