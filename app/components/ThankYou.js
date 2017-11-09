import React from 'react';
import { connect } from 'react-redux'

class ThankYou extends React.Component {
	
	constructor(props) {
		super(props)
	}
	
  componentDidMount(){
	  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			$('body').addClass('ios thank-you-page');
	  } else{
			$('body').addClass('web thank-you-page');
	  };
	  $('body').css('background','url(/templates/ArtOfLiving/images/thank-you-bg.png)')
  }

  render() {
	return (
		<div>
		  <section className="thank_you_container">
			<div className="inner_container">
				<h6>Thank you, your seat has been reserved</h6>
				<p>A confirmation email has been sent to xxx@ddd.com</p>
				<h1>
					You&#8217;re all set to experience the <strong>Mind & Meditation</strong> workshop and discover the power of the breath.
				</h1>

				<div className="thank_you_buttons">
					<a href="#">
						<i className="fa fa-calendar" aria-hidden="true"></i>
						Add to calendar
					</a>
					<a href="#">
						<i className="fa fa-map-marker" aria-hidden="true"></i>
						Get directions
					</a>
				</div>
				<p>
					This event is best enjoyed with friends. Click below to share:
				</p>
				<ul className="share_list">
					<li>
						<a href="#" className="fb">
							<i className="fa fa-facebook" aria-hidden="true"></i>
						</a>
					</li>
					<li>
						<a href="#" className="tw">
							<i className="fa fa-twitter" aria-hidden="true"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</a>
					</li>
				</ul>

				<p>
					<a href="#">Contact us</a> if you have any questions about the event.
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
						<a href="#">Benefits of Meditation </a>
					</h3>
					<p>
						The Health Benefits of Meditation From the medical community to the yoga community, the verdict is out: you need to meditate! Recent studies from Harvard
					</p>
					<div>
						<a href="#" className="read_more">
							Read more
						</a>
					</div>
				</article>
				<article className="recent_article">
					<a href="#" className="recent_article--image">
						<img src="/templates/ArtOfLiving/images/thank-you-article2.png" alt="title" />
					</a>
					<h3 className="recent_article--title">
						<a href="#">7 Attitudes of Truly  Happy People </a>
					</h3>
					<p>
						1. Is being stressed a sign of prosperity,  growth, or dignity?
					</p>
					<div>
						<a href="#" className="read_more">
							Read more
						</a>
					</div>
				</article>
				<article className="recent_article">
					<a href="#" className="recent_article--image">
						<img src="/templates/ArtOfLiving/images/thank-you-article3.png" alt="title" />
					</a>
					<h3 className="recent_article--title">
						<a href="#">Sun Salutation Yoga  Sequence (Surya Namaskar) </a>
					</h3>
					<p>
						Change is hard and most of us resist any change. Even though change may be
					</p>
					<div>
						<a href="#" className="read_more">
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

export default connect(mapStateToProps)(ThankYou);
