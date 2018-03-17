$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');
});
/* viewport width */


(function ($) {


	/* placeholder*/
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){
 			$(this).attr('placeholder', placeholder);
 		});
 	});
	/* placeholder*/

	// Sticky Footer
	// var bumpIt = function() {
	// 	// $('body').css('padding-bottom', $('.footer').outerHeight(true));
	// 	$('.footer').addClass('sticky-footer');
	// },
	// didResize = false;

	// $(window).resize(function() {
	// 	didResize = true;
	// });
	// setInterval(function() {
	// 	if(didResize) {
	// 		didResize = false;
	// 		// bumpIt();
	// 	}
	// }, 250);

	$(document).ready(function () {
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



	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 300) {
			$('.go_top').addClass('visible');
		}
		else{
			$('.go_top').removeClass('visible');
		}
	});


}(jQuery));
