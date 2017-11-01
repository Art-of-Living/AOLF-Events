import React from 'react';
import Header from './header';
import { connect } from 'react-redux'
import Footer from './footer';
import Contact from '../../Contact';

class Index extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount(){
		this.props.dispatch({type : 'title', title : this.props.data.event_name})
	}

  render() {
	var event = this.props.data;
	var eventDate = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
    return (
      <div>
		<Header/>
		<div className="container hero">
			<div className="row">
				<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-0">
					<h1>{event.event_name}</h1>
					<p>{event.event_description}</p>
				</div>
			</div>
		</div>
		<div className="service-section">
			<div className="container">
				<div className="row-eq-height">
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="service-part-cw">
							<img src="/images/service-cw.png" className="img-responsive" alt="" />
							<p>"Life Changing"</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="service-part-yoga">
							<img src="/images/service-harvard.png" className="img-responsive" alt="" />
							<p>"Maybe the fastest spirtual practice on the planet"</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="service-part-yoga">
							<img src="/images/service-washington.png" className="img-responsive" alt="" />
							<p>"Like fresh air to millions"</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div className="service-part-yoga">
							<img src="/images/service-yoga.png" className="img-responsive" alt="" />
							<p>"Show promise in providing relief for depression"</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="aboutus-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="aboutus-content mt-2 ">
							<h4 className="wow fadeInDown" data-wow-delay=".2s" data-wow-duration="3s">About the <span> Workshop </span></h4>
							<p>This free 1-hr className is an introduction to the world-renowned  Art of Living Happiness Program, a transformative immersion in powerful breathing techniques and mind mastery.</p>
							<h6 className="wow fadeInUp" data-wow-delay=".2s" data-wow-duration="3s">GET A TASTE OF</h6>
						</div>
					</div>
				</div>
				<div className="row">
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="aboutus-box wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="2s">
								<i className="fa fa-check-circle-o" aria-hidden="true"></i>
								<h6>Yogic breathing exercises</h6>
								<p>The quickest, most effective way to REDUCE STRESS and experience deep effortless MEDITATION.</p>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<div className="aboutus-box">
								<i className="fa fa-check-circle-o" aria-hidden="true"></i>
								<h6>Mind mastery </h6>
								<p>Get insights on how to stay SKILFULLY PEACEFUL and positive, even through challenging times</p>
							</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div className="aboutus-box wow fadeInRight" data-wow-delay=".2s" data-wow-duration="2s">
								<i className="fa fa-check-circle-o" aria-hidden="true"></i>
								<h6>Effortless guided meditation </h6>
								<p>See how to fully relax and let go, even if meditation has never "worked for you" before.</p>
							</div>
						</div>
				</div>
				<div className="row-eq-height">
						<div className="aboutus-workshop">
							<h4>WORKSHOP <span>LOCATION </span></h4>
							<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
								<div className="aboutus-workshop-box">
								<img src="/images/time.png" alt="" className="img-responsive wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="2s" />
									<h4 className="img-responsive">TIME </h4>
									<p className="img-responsive"> 7 pm - 8 pm </p>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
								<div className="aboutus-workshop-box-circle">
								<img src="/images/venus.png" alt="" className="img-responsive wow fadeInUp" data-wow-delay=".2s" data-wow-duration="2s" />
									<h4 className="img-responsive"> VENUE</h4>
									<p className="img-responsive">Sri Sri Center for Peace & Meditation 2401 15th st NW,
										Washington, DC 20009 </p>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
								<div className="aboutus-workshop-box-circle">
								<img src="/images/free.png" alt="" className="img-responsive wow fadeInRight" data-wow-delay=".2s" data-wow-duration="2s" />
									<h4 className="img-responsive">FREE </h4>
									<p className="img-responsive">Other workshop</p>
								</div>
							</div>
						</div>
				</div>
				<div className="row-eq-height">
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pad">
							<a href="#">
								<div className="aboutus-calender">
									<i className="fa fa-calendar-o" aria-hidden="true"></i>
									<h6>ADD TO CALENDAR</h6>
								</div>
							</a>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pad">
							<a href="#">
								<div className="aboutus-direction">
									<i className="fa fa-map-marker" aria-hidden="true"></i>
									<h6>VIEW ON MAP</h6>
								</div>
							</a>
						</div>
				</div>
			</div>
		</div>
		<div className="spot-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<h1 className="wow fadeInDown" data-wow-delay=".2s" data-wow-duration="3s">SAVE MY<span> SPOT NOW! </span></h1>

						<form className="spot-form">
							<h1>CHOOSE A DATE </h1>
							<div className="wow bounce" data-wow-offset="10" data-wow-delay=".2s" data-wow-duration="3s"> 
							<div className="form-group">
								<label for="text" className="spot-form-lable">Event Date *</label>
								<input type="date" className="form-control spot-form-datepicker" id="Event" />
							</div>
							<div className="form-group">
								<label for="text" className="spot-form-lable">First Name *</label>
								<input type="email" className="form-control spot-form-input" id="firstname" />
							</div>
							<div className="form-group">
								<label for="email" className="spot-form-lable">Email *</label>
								<input type="email" className="form-control spot-form-input" id="email" />
							</div>
							<div className="form-group">
								<label for="tel" className="spot-form-lable">Phone *</label>
								<input type="text" className="form-control spot-form-input" id="phone" />
							</div>
							<button type="submit" className="btn btn-submit">save my spot</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div className="trainer-section">
			<div className="container">
				<div className="row-eq-height">
					<h4 className="wow fadeInDown" data-wow-delay=".2s" data-wow-duration="3s">Our <span> Trainers </span></h4>
					<div className="col-lg-3 col-md-3 col-sm-12 col-md-12">
					<div className="trainer-box wow fadeInLeft" data-wow-delay=".1s" data-wow-duration="1s">
							<img src="/images/trainer-one.jpg" alt="" className="img-responsive" />
							<h4>Maggie </h4>
							<h6>Ceo&Founder</h6>
							<a href="#" className="btn-submit"> Read more</a>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-md-12">
					<div className="trainer-box wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.5s">
							<img src="/images/trainer-two.jpg" alt="" className="img-responsive" />
							<h4>Rick Grime </h4>
							<h6>Ceo&Founder</h6>
							<a href="#" className="btn-submit"> Read more</a>
						</div>
					</div>

					<div className="col-lg-3 col-md-3 col-sm-12 col-md-12">
					<div className="trainer-box wow fadeInRight" data-wow-delay=".2s" data-wow-duration="2s">
							<img src="/images/trainer-three.jpg" alt="" className="img-responsive" />
							<h4>Diana </h4>
							<h6>Ceo&Founder</h6>
							<a href="#" className="btn-submit"> Read more</a>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-md-12">
					<div className="trainer-box wow fadeInRight" data-wow-delay=".2s" data-wow-duration="3s">
							<img src="/images/trainer-four.jpg" alt="" className="img-responsive" />
							<h4>Spencer </h4>
							<h6>Ceo&Founder</h6>
							<a href="#" className="btn-submit"> Read more</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="ourvenue-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						
					</div>
					<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
						<div className="ourvenue-content">
							<h1 className="wow fadeInDown" data-wow-delay=".2s" data-wow-duration="3s">Our Venue</h1>
							<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="sociallink-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h4 className="wow fadeInDown" data-wow-delay="2s" data-wow-duration="3s">Share with <span> friends</span></h4>
						<div className="social-link">
							<a href=""><img src="/images/facebooksocial-icon.png" alt="" className="img-responsive" /> </a>

							<a href=""><img src="/images/youtube-icon.png" alt="" className="img-responsive" /> </a>

							<a href=""><img src="/images/twitter-icon.png" alt="" className="img-responsive" /> </a>

							<a href=""><img src="/images/googleplus-icon.png" alt="" className="img-responsive" /> </a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="happyprogram-section">
			<div className="container">
				<div className="row-eq-height">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="happyprogram-content mt-3">
							<h1 className="wow fadeInDown" data-wow-delay=".2s" data-wow-duration="3s">The <span> Happiness Program  </span></h1>
							<p>The Happiness Program, a transformative 3-day immersion in powerful breathing techniques and mind mastery. The main technique on The Happiness Program is called Sudarshan Kriya&reg; a research-backed breathing technique that has helped millions of people release stress, experience deep meditation, and get back in touch with their true self. </p>
						</div>
					</div>
					<div className="video-container">
						<h4>How The Happiness Program is changing lives</h4>  
						<iframe width="80%" height="455" src="https://www.youtube.com/embed/fc1JEzlmHA8" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
				<div className="testimonial-section">
					<h4>Experience Sharing from <span> Participants </span></h4>
					<div className="slick-testimonial" ref={(testimonial) => this.testimonial = testimonial}>
					<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
						<div className="testimonial-box">
							<img src="/images/testimonal-image-1.png" alt="" className="img-responsive" />
							<p>“Within three days I started experiencing a deep shift within myself from anxiousness to peace, from sadness to joy. As each day progresses, I find myself more and more centered In the joy and clarity of a calm and peaceful existence.”</p>
							<h4>Glenn-Douglas Haig</h4>
							<h6>CEO</h6>
						</div>
					</div>
					<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
						<div className="testimonial-box">
							<img src="/images/testimonal-image-2.png" alt="" className="img-responsive" />
							<p>“I have been looking for this for 15 years! The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day.” </p>
							<h4>Charlotte Plus</h4>
							<h6>Lawyer </h6>
						</div>
					</div>
					<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
						<div className="testimonial-box">
							<img src="/images/testimonal-image-3.png" alt="" className="img-responsive" />
							<p>“I felt a huge change in my whole body. After almost three years and nothing working, a simple breathing technique had just changed my life. I now feel amazing. I’m back to the old me and I see the world differently.”
							</p>
							<h4>Maddy King</h4>
							<h6>Model</h6>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
		<div className="Research-section">
			<div className="container">
				<div className="row">
					<h4 className="wow fadeInDown" data-wow-delay=".2s" data-wow-duration="3s">Scientific <span> Research</span> </h4>
					<h6> On the Art of living breathing Techniques </h6>
					<p>The maine technique on the Happiness Program is the Sudarshan Kriya, a research-backed technique that has helped millions of people in over 150 countries to release stress, experience deep maeditation, and get back in touch with thier true self.</p>
					<div className="col-md-3 col-md-3 col-sm-6 col-xs-12 wow fadeInRight" data-wow-delay="1.2s" data-wow-duration="2s">
						<div className="research-box mt-2">
							<img src="/images/deep.png" alt="" className="img-responsive" />
							<h4>DEEP SLEEP <span>	
								<br /> INCREASE </span></h4>
							<h1>218%  </h1> <p> <span> INCREASE </span> <br /> IN DEEP SLEEP</p>
						</div>
					</div>
					<div className="col-md-3 col-md-3 col-sm-6 col-xs-12 wow fadeInRight" data-wow-delay="1.2s" data-wow-duration="2s">
						<div className="research-box mt-2">
							<img src="/images/well.png" alt="" className="img-responsive" />
							<h4>WELL-BEING <span>	<br /> HORMONES INCREASE </span></h4>
							<h1>50%  </h1> <p> <span> INCREASE </span> <br />SERUM PEOLACTIN</p>
						</div>
					</div>
					<div className="col-md-3 col-md-3 col-sm-6 col-xs-12 wow fadeInLeft" data-wow-delay="1.2s" data-wow-duration="2s">
						<div className="research-box mt-2">
							<img src="/images/drepression.png" alt="" className="img-responsive" />
							<h4>DEPRESSION<span>	<br /> DECREASES </span></h4>
							<h1>70% </h1> <p> <span> REMISSION RATE </span> <br />IN DEPRESSION IN 1 MO</p>
						</div>
					</div>
					<div className="col-md-3 col-md-3 col-sm-6 col-xs-12 wow fadeInLeft" data-wow-delay="1.2s" data-wow-duration="2s">
						<div className="research-box mt-2">
							<img src="/images/stress.png" alt="" className="img-responsive" />
							<h4>STRESS <br /><span> HORMONES DECREASES </span></h4>
							<h1>56%  </h1> <p> <span> REDUCTION  </span> <br />SERUM CORTIZOL</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="mindsection-content mt">
							<h1>MIND & MEDITATION</h1>
							<h6>FREE Introductory Workshop 
								to <span>The Happiness Program </span></h6>
							<a className="btn-submit button" href="#">Save a spot</a>	
						</div>
					</div>
				</div>
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

export default connect(mapStateToProps)(Index);