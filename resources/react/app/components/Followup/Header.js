import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import { withRouter } from 'react-router' 

class Header extends React.Component {	

	constructor(props) {
		super(props)
	}
	
	componentDidMount(){
		this.changeRandomImage();
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			$('body').addClass('ios followup');
		} else{
			$('body').addClass('web followup');
		};
		
		$('body').removeClass('loaded');
		
		var stickyTop = $('.small_banner').offset().top;

		$(window).on( 'scroll', function(){
			if ($(window).scrollTop() >= stickyTop) {
				$('.small_banner').addClass('collapsed');
			} else {
				$('.small_banner').removeClass('collapsed');
			}
		});
		
		$('input, textarea').each(function(){
			var placeholder = $(this).attr('placeholder');
			$(this).focus(function(){ $(this).attr('placeholder', '');});
			$(this).focusout(function(){
				$(this).attr('placeholder', placeholder);
			});
		});
		
		var bumpIt = function() {
			$('body').css('padding-bottom', $('.footer').outerHeight(true));
			$('.footer').addClass('sticky-footer');
		},
		
		didResize = false;

		$(window).resize(function() {
			didResize = true;
		});
		setInterval(function() {
			if(didResize) {
				didResize = false;
				bumpIt();
			}
		}, 250);
		
		bumpIt();

		$('a[href*="#"]').click(function(event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 1500);
		});
		
		$('.map_items_sect .map_item').each(function(){
			$(this).on("click", function(){
				$('.map_items_sect .map_item').removeClass('active');
				$('.map_sidebar').removeClass('opened_sidebar');
				$(this).addClass('active');
				$('.map_section .map_overlay').addClass('active');
				$('.map_section .map_popup').addClass('active');
			});
		});
		
		$('.map_overlay').on("click", function(){
			$(this).removeClass('active')
			$('.map_section .map_popup').removeClass('active');
		});

		$('.map_sidebar .map_sidebar__btn').on("click", function(){
			$(this).parent().toggleClass('opened_sidebar');
		})
		
		$(window).scroll(function() {
			if ($(this).scrollTop() > 300) {
				$('.go_top').addClass('visible');
			} else{
				$('.go_top').removeClass('visible');
			}
		});
	}
	
	changeRandomImage(){
		var main_banner = this.main_banner
		var imageArray = ["/templates/followup/images/building.jpg","/templates/followup/images/banner2.jpg","/templates/followup/images/banner3.jpg"];
		var randomImage = Math.floor(Math.random() * imageArray.length);
		main_banner.style.backgroundImage = "url(" + imageArray[randomImage] + ")";
	}
  
    render() {	
		 return (
			<div>
				<section className="main_banner" id="main_banner" ref={(ele) => this.main_banner = ele}>
					<div className="row logo_row">
						<div className="col-md-12">
							<a href="#" className="logo">
								<img src="/templates/followup/images/logo.png" alt="logo" />
								<div className="random"></div>
							</a>
						</div>
					</div>
					<div className="main_banner--content">
						<div className="row">
							<div className="col-md-12">
								<div className="caption">
									<h1>
										Free Sudarshan Kriya Practice Groups
									</h1>
									<p>
										Join your local Sudarshan Kriya Practice Group to recharge yourself for the week
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="main_banner--bottom">
						<span>
							Click to find Sudarshan Kriya Practice Group near you
						</span>
						<a className="bounce" href="#small_banner">
							<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 1000 1000'><path d='M500,768.6c-14.1,0-23.6-4.7-33-14.1L24.1,311.5c-18.8-18.8-18.8-47.1,0-66c18.8-18.8,47.1-18.8,66,0L500,655.5l409.9-409.9c18.8-18.8,47.1-18.8,66,0c18.8,18.8,18.8,47.1,0,66L533,754.4C523.6,763.8,514.1,768.6,500,768.6z'/></svg>
						</a>
					</div>
				</section>

				<section className="small_banner" id="small_banner" style={{backgroundImage : "url(/templates/followup/images/small_banner.jpg)"}} >
					<div className="row">
						<div className="col-md-12">
							<div className="small_banner--text">
								<h2>Find Sudarshan Kriya
								Practice Group near you</h2>
							</div>
						</div>
					</div>
				</section>
			</div>	
		);
	}
}

const mapStateToProps = (state) => {
  return {
    messages : state.messages
  };
};

const connectedContainer = connect(mapStateToProps)(Header);
const RoutedContainer = withRouter(connectedContainer);
export default RoutedContainer;
