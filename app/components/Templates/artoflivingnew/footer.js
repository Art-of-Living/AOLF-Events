import React from 'react';

class Footer extends React.Component {
  render() {
    return (
        <footer className="footer">
			<div className="row">
				<div className="col-md-12 hide-for-mobile">
					<div className="footer__logo">
						<a href="#">
							<img src={"/templates/" + process.env.REACT_TEMPLATE + "/images/footer_logo.png"} alt='logo' />
						</a>
					</div>
					<ul className="footer__links">
						<li>
							<span>
								&copy; 2017 Art of Living
							</span>
						</li>
						<li>
							<a href="https://www.artofliving.org/us-en/terms-use" target="_blank">
								Terms of Use
							</a>
						</li>
						<li>
							<a href="https://www.artofliving.org/us-en/privacy-policy" target="_blank">
								Privacy Policy
							</a>
						</li>
					</ul>
				</div>
				<div className="col-md-12 show-for-mobile">
					<ul className="footer__links">
						<li>
							<span>
								&copy; 2018 Art of Living
							</span>
						</li>
						<li>
							<span>
								All rights reserved
							</span>
						</li>
					</ul>
					<ul className="footer__links">
						<li>
							<a href="https://www.artofliving.org/us-en/terms-use" target="_blank">
								Terms of Use 
							</a>
						</li>
						<li>
							<a href="https://www.artofliving.org/us-en/privacy-policy" target="_blank">
								Privacy Policy
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
    );
  }
}

export default Footer;
