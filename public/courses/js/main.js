;
(function ($) {
  $(document).ready(function(){


    // $('.matchHeight').matchHeight();

    if ($('.landing_testimonial__slider').length){
      $('.landing_testimonial__slider').slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        slide: '.land_testimon_slide',
        responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1
          }
        }
        ]
      });
    }

    if ($('.landing_find_course_slider').length){
      $('.landing_find_course_slider').slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 1,
        slide: '.find_course_slide',
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1
          }
        }
        ]
      });
    }


  });


})(jQuery);
