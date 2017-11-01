import React from 'react';

class Footer extends React.Component {
  render() {
    return (
        <footer class="footer-section">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
						<div class="copyright">
							<p>Copyright &reg; 2017 Art of living. All Rights Reserved</p>
						</div>
					</div>
					<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
						<div class="privacypolicy">
							<a href="https://www.artofliving.org/us-en/privacy-policy"><span>Privacy Policy </span> </a>
							<a href="https://www.artofliving.org/us-en/terms-use"><span>Terms of Use </span></a>
						</div>
					</div>
				</div>
			</div>
			<script type="text/javascript " src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js "></script>
			<script type="text/javascript" src="/js/lib/main.js"> </script>
			<script type="text/javascript" src="/js/lib/bootstrap.js"> </script>
			<script type="text/javascript" src="/js/lib/slick.js"> </script>
		</footer>
    );
  }
}

export default Footer;
