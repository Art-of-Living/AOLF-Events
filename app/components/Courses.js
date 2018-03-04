import React from 'react';
import { connect } from 'react-redux'
//import { submitContactForm } from '../actions/contact';
import Messages from './Messages';
import queryString from 'query-string';
import moment from 'moment';

import CountdownTimer from 'react-awesome-countdowntimer';

var store = require('../store/configureStore').default;

class Courses extends React.Component {
  //params = {};
  constructor(props) {
    super(props);

    console.log("store::::::::::>>>>>>>>>>>>>>", store);
    this.state = {
      timeRemaining: {
        months: '',
        days: '',
        h: '',
        m: '',
        s: '',
        interval: function () {

        }
      },
      startDate: new moment(),
      min: new Date(),
      startTimer: false
    }
    this.state.shareUrl = "";
    this.state.shareOrigin = "";
    this.tick = this.tick.bind(this);

    this.state.noCources = false;
    if (this.props.location.search == "") {
      this.state.noCources = true;
    }

    console.log("props ::::::::::::::::::", props);
    console.log("props.request:::::::::::", props.request);
    //this.state = { code: '', email: '', expire: '', courses: [], params : "" };
    let params = queryString.parse(this.props.location.search);
    //this.params = this.state.params = params;
    console.log("this.props.location, params", this.props.location, params);
    if (params.hasOwnProperty('code')) {
      this.state.code = params.code;
    }
    if (params.hasOwnProperty('email')) {
      this.state.email = params.email;
    }
    if (params.hasOwnProperty('expire')) {
      this.state.expire = params.expire;
    }
    this.state.cources = [];
    console.log('::this.state.params.courses::', params.courses);
    console.log('::this.state.params.courses[]::', params["courses[0][city]"]);
    for (var i = 0; i < 100; i++) {
      console.log('::this.state.params::', params);
      if (params.hasOwnProperty("courses[" + i + "]['saoid']")) {
        let startDateMonth = moment(params["courses[" + i + "]['start']"], "MM/DD/YYYY HH:mm A").format('MMMM');
        let endDateMonth = moment(params["courses[" + i + "]['end']"], "MM/DD/YYYY HH:mm A").format('MMMM');
        let startDateDay = moment(params["courses[" + i + "]['start']"], "MM/DD/YYYY HH:mm A").format('DD');
        let endDateDay = moment(params["courses[" + i + "]['end']"], "MM/DD/YYYY HH:mm A").format('DD');
        let link = "https://register2.artofliving.org/us/civicrm/event/register?id=" + params["courses[" + i + "]['saoid']"] + "&lcMessages=en_GB&reset=1&discount=" + params["code"];

        console.log(":::::::::::::: startDateMonth, endDateMonth, startDateDay, endDateDay, link", startDateMonth, endDateMonth, startDateDay, endDateDay, link);
        this.state.cources.push({
          'startDateMonth': startDateMonth,
          'endDateMonth': endDateMonth,
          'startDateDay': startDateDay,
          'endDateDay': endDateDay,
          'link': link,
          'start': params["courses[" + i + "]['start']"],
          'end': params["courses[" + i + "]['end']"],
          'city': params["courses[" + i + "]['city']"],
          'saoid': params["courses[" + i + "]['saoid']"],
          'code': params.code,
          'expire': params.expire,
          'email': params.email,
        });
        console.log('::this.state.cources::', this.state.cources);
      }
      else {
        break;
      }
    }


  }


  componentDidMount() {
    this.state.interval = setInterval(this.tick, 1000);
    console.log("window>>>>>>>>", window);

    this.setState({ shareUrl: window.location.href, shareOrigin: window.location.origin });
  }
  componentWillUnmount() {
    this.state.interval && clearInterval(this.state.interval);
  }

  tick() {
    //if (typeof this.props.endDate  === typeof new Date()) {
    this.afterEachSecond(moment(this.state.expire, 'MM/DD/YYYY').utcOffset('-0400'));
    //} else {
    //}
  }
  afterEachSecond(endDate) {
    var temp = { months: '', days: '', h: '', m: '', s: '' };
    var now = moment(); // today's date
    var end = moment(endDate); // end date
    var duration = moment.duration(end.diff(now));
    if (duration.asSeconds() >= 0) {
      if (Math.floor(duration.asMonths()) > 0) { if (Math.floor(duration.asMonths()) < 10) { temp.months = '0' + Math.floor(duration.asMonths()) } else { temp.months = Math.floor(duration.asMonths()) } }
      if (Math.floor(duration.asDays()) > 0) { if (Math.floor(duration.days()) < 10) { temp.days = '0' + Math.floor(duration.days()) } else { temp.days = Math.floor(duration.days()) } }
      if (Math.floor(duration.asHours()) > 0) { if (Math.floor(duration.hours()) < 10) { temp.h = '0' + Math.floor(duration.hours()) } else { temp.h = Math.floor(duration.hours()) } }
      if (Math.floor(duration.asMinutes()) > 0) { if (Math.floor(duration.minutes()) < 10) { temp.m = '0' + Math.floor(duration.minutes()) } else { temp.m = Math.floor(duration.minutes()) } }
      if (Math.floor(duration.asSeconds()) > 0) { if (Math.floor(duration.seconds()) < 10) { temp.s = '0' + Math.floor(duration.seconds()) } else { temp.s = Math.floor(duration.seconds()) } }
    }
    this.setState({
      timeRemaining: temp
    })
  }

  getContent() {
    if (this.state.noCources) {
      return(
      <div className="container-fluid no-margin-padding">
        <link rel="stylesheet" href="/courses/css/style.css" />
        <div className="text-center">
          <h1 className="landing_banner--title">
            Opps! No gift card available. Check back later.
          </h1>
        </div>
      </div>
      );
    }
    else {
      return (
        <div className="container-fluid no-margin-padding">
          <link rel="stylesheet" href="/courses/css/style.css" />
          <div className="text-center">
            <h1 className="landing_banner--title">
              Use this gift card to save on an upcoming Happiness Program
          </h1>
          </div>
          <section className="landing_banner" style={{ backgroundImage: "url(/courses/images/banner_bg.jpg)" }}>
            <div className="text-center">

              <div className="banner_gift_card">
                <img src="/courses/images/gitft_card.png" alt="image" />
                <span className="price">
                  $40<span>*</span>
                </span>
                <div className="code">
                  code: {this.state.code}
                </div>
              </div>

              <div className="landing_banner--text">
                <span>
                  Use the above code while registering for the program as a promo code.
              </span>
              </div>
            </div>
          </section>
          <section className="landing_find_course">
            <div className="row">
              <div className="col-md-12">
                <div className="text-center text_caption">
                  <span>
                    {/* <CountdownTimer endDate={moment(this.state.expire, 'MM/DD/YYYY')}/> */}
                    This code expires in
                    <b>
                      {
                        " " + this.state.timeRemaining.months + " Months, "
                      }

                      {
                        this.state.timeRemaining.days + " Days, "
                      }

                      {
                        this.state.timeRemaining.h //+ " Hours"
                      }
                      :
                    {
                        this.state.timeRemaining.m //+ " Minutes"
                      }
                      :
                    {
                        this.state.timeRemaining.s + " "//+ "Seconds"
                      }
                      Hours
                    </b>
                  </span>
                  <h2>
                    Enroll Now for a Happiness Program <u>near you</u>
                  </h2>
                  <p>
                    before the gift card expires
                </p>
                </div>
                <div className="landing_find_course_slider">

                  {
                    this.state.cources.map((object, index) => {
                      return (
                        <div className="find_course_slide" key={index}>
                          <div className="inner_block">
                            <h5 className="title">
                              {object.startDateMonth}
                              {" "}
                              {object.startDateDay}
                              {" - "}
                              {object.endDateDay}
                            </h5>
                            <div className="location">
                              {object.city}
                            </div>
                            <a href={object.link} target="_blank" className="btn_yellow">
                              Learn More
                              </a>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>

                <div className="text-center landing_find_course_footer">
                  <p>
                    <a href="https://www.artofliving.org/us-en/search/course#distance=5&sSearch=United States&st=&lat=&lng=&ctype=12371,12517,54553,12519,398713,411097,455542,456483,458421,435714&mctype=&acol=0&c=&cc=&d1=&d2=" target="_blank">See other courses and events nationwide</a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="landing_featured_sect">
            <div className="row">
              <div className="col-md-12">
                <span>Featured in</span>
                <div className="text-center flex">
                  <img src="/courses/images/landing_featured1.png" alt="Feature Image" />
                  <img src="/courses/images/landing_featured2.png" alt="Feature Image" />
                  <img src="/courses/images/landing_featured3.png" alt="Feature Image" />
                  <img src="/courses/images/landing_featured4.png" alt="Feature Image" />
                  <img src="/courses/images/landing_featured5.png" alt="Feature Image" />
                  <img src="/courses/images/landing_featured6.png" alt="Feature Image" />
                  <img src="/courses/images/landing_featured7.png" alt="Feature Image" />
                </div>
              </div>
            </div>
          </section>

          <section className="share_sect">
            <div className="row">
              <div className="col-md-12">
                <h3 className="share_sect--title">
                  Share this gift with a friend
              </h3><div className="addthis_inline_share_toolbox"></div>
                <ul>
                  <li>
                    <a target="_blank" href={"http://www.facebook.com/sharer/sharer.php?s=100&p[images][0]=" + this.state.shareOrigin + "/courses/images/logo.png&p[title]=Art+of+Livinggift+card+to+save+on+an+upcoming+Happiness&p[summary]=Use gift card to save on an upcoming Happiness Program&p[url]=" + this.state.shareUrl}>
                      <img src="/courses/images/fb.png" alt="icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/courses/images/msg.png" alt="icon" />
                    </a>
                  </li>
                  <li>
                    <a href={"mailto:?subject=Art of Livinggift card to save on an upcoming Happiness&body=Use gift card to save on an upcoming Happiness Program. For more detail click " + this.state.shareUrl}>
                      <img src="/courses/images/email.png" alt="icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/courses/images/share.png" alt="icon" />
                    </a>
                  </li>
                </ul>
                <div className="text-center">
                  <p>
                    (this code is good for two uses)
                </p>
                </div>
              </div>
            </div>
          </section>

          <section className="landing_testimonial_sect" style={{ backgroundImage: "url(/courses/images/landing_testimonial_sect.png)" }}>
            <div className="row">
              <div className="col-md-12">
                <div className="text-center">
                  <h2 className="landing_testimonial--title">What others are <span>saying</span></h2>
                </div>
                <div className="landing_testimonial__slider">
                  <div className="land_testimon_slide">
                    <div className="block-text">
                      <div className="person-text">
                        <img src="/courses/images/test-1.png" alt="person" />
                        <div className="testi_name testi_name_desc">
                          <span>Dr. Joe Rod</span>
                          <i>Cardiologist</i>
                        </div>
                      </div>
                      <p>
                        "After 90 days of doing this, I felt my stress was markedly reduced, and now I would not stop doing it, because I would not want to revert to the levels of stress I had at the time."
            </p>
                    </div>
                  </div>
                  <div className="land_testimon_slide">
                    <div className="block-text">
                      <div className="person-text">
                        <img src="/courses/images/test-2.png" alt="person" />
                        <div className="testi_name testi_name_desc">
                          <span>Mawahib Shaibani</span>
                          <i>Financial Advisor</i>
                        </div>
                      </div>
                      <p>
                        "I used to be so tense. I'd be getting so angry, shouting, screaming, pushing around to get my orders through. Now when I realize I'm getting tense I just breathe and I calm down. I realize that I'm much more focused and much more productive."
            </p>
                    </div>
                  </div>
                  <div className="land_testimon_slide">
                    <div className="block-text">
                      <div className="person-text">
                        <img src="/courses/images/test-3.png" alt="person" />
                        <div className="testi_name testi_name_desc">
                          <span>Phillip Mertz</span>
                          <i>Investment Manager</i>
                        </div>
                      </div>
                      <p>
                        "About 30 days after doing the techniques very regularly, I just got so happy for no reason. And I hadn't experienced that in a long time."
                    </p>
                    </div>
                  </div>
                  <div className="land_testimon_slide">
                    <div className="block-text">
                      <div className="person-text">
                        <img src="/courses/images/test-4.jpg" alt="person" />
                        <div className="testi_name testi_name_desc">
                          <span>Charlotte Puls</span>
                          <i>Lawyer</i>
                        </div>
                      </div>
                      <p>
                        "I have been looking for this for 15 years! The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day."
                    </p>
                    </div>
                  </div>
                  <div className="land_testimon_slide">
                    <div className="block-text">
                      <div className="person-text">
                        <img src="/courses/images/test-5.jpg" alt="person" />
                        <div className="testi_name testi_name_desc">
                          <span>Glenn-Douglas Haig</span>
                          <i>CEO</i>
                        </div>
                      </div>
                      <p>
                        "Within three days I started experiencing a deep shift within myself from anxiousness to peace, from sadness to joy. As each day progresses, I find myself more and more centered in the joy and clarity of a calm and peaceful existence."
                    </p>
                    </div>
                  </div>
                  <div className="land_testimon_slide">
                    <div className="block-text">
                      <div className="person-text">
                        <img src="/courses/images/test-6.jpg" alt="person" />
                        <div className="testi_name testi_name_desc">
                          <span>Maddy King</span>
                          <i>Model</i>
                        </div>
                      </div>
                      <p>
                        "I felt a huge change in my whole body. After almost three years and nothing working, a simple breathing technique had just changed my life. I now feel amazing. I'm back to the old me and I see the world differently."
                    </p>
                    </div>
                  </div>
                  <div className="land_testimon_slide">
                    <div className="block-text">
                      <div className="person-text">
                        <img src="/courses/images/test-7.png" alt="person" />
                        <div className="testi_name testi_name_desc">
                          <span>Manuj</span>
                          <i>University Student</i>
                        </div>
                      </div>
                      <p>
                        "I now have an internal sense of power."
                    </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="row">
              <div className="col-md-8 col-sm-7">
                <img src="/courses/images/logo.png" alt="logo" />
                <div className="footer__text">
                  <p>
                    *exclusions apply - Valid for single purchase only, regular price, cannot be combined with any other offer, USA only, No cash value/ may not be redeemed as cash, only valid for recipient of this offer.
                </p>
                </div>
                <ul className="footer__copyright">
                  <li>
                    <span>&copy; 2018 art of living</span>
                  </li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Use</a></li>
                </ul>
              </div>
              <div className="col-md-4 col-sm-5">
                <ul className="footer__connect_list">
                  <li>
                    connect
                </li>
                  <li>
                    <a href="http://twitter.com/artofliving" target="_blank">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.facebook.com/TheArtOfLivingGlobal" target="_blank">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.youtube.com/artofliving" target="_blank">
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>
                    </a>
                  </li>
                  {/*
                <li>
                  <a href="http://plus.google.com/+artofliving" target="_blank">
                    <i className="fa fa-google-plus" aria-hidden="true"></i>
                  </a>
                </li>
               */}
                  <li>
                    <a href="http://instagram.com/artofliving" target="_blank">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
                <iframe name="f3935c2d6edb4c8" width="100px" height="1000px" frameBorder="0" allowTransparency="true" allowFullScreen="true" scrolling="no" title="fb:like Facebook Social Plugin" src="https://www.facebook.com/v2.5/plugins/like.php?action=like&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FlY4eZXm_YWu.js%3Fversion%3D42%23cb%3Df3feb927cbadba4%26domain%3Dwww.artofliving.org%26origin%3Dhttps%253A%252F%252Fwww.artofliving.org%252Ff2860c5971a8ec%26relation%3Dparent.parent&amp;container_width=0&amp;href=https%3A%2F%2Fwww.facebook.com%2FArtOfLivingUSA&amp;layout=standard&amp;locale=en_GB&amp;sdk=joey&amp;share=false&amp;show_faces=false&amp;width=100" style={{ border: "none", visibility: "visible", width: 225, height: 28 }} className=""></iframe>
                <iframe id="twitter-widget-0" scrolling="no" frameBorder="0" allowTransparency="true" className="twitter-follow-button twitter-follow-button-rendered" style={{ border: "none", position: "static", visibility: "visible", width: 195, height: 24 }} title="Twitter Follow Button" src="https://platform.twitter.com/widgets/follow_button.36c0c29c73929bf937f4c70adb1a29e4.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=srisri&amp;show_count=true&amp;show_screen_name=true&amp;size=m&amp;time=1518729698855" data-screen-name="srisri"></iframe>
              </div>
            </div>
          </footer>
          <script type="text/javascript" src="/courses/js/slick.js"> </script>
          <script type="text/javascript" src="/courses/js/main.js"> </script>
        </div>
      );
    }
  }
  render() {
    return this.getContent();
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Courses);
