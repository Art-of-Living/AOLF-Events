import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import { withRouter } from 'react-router';

class Referral extends React.Component {	

	constructor(props) {
		super(props);
	}
	
	componentDidMount(){
		!function(){var a=window.VL=window.VL||{};return a.instances=a.instances||{},a.invoked?void(window.console&&console.error&&console.error("VL snippet loaded twice.")):(a.invoked=!0,void(a.load=function(b,c,d){var e={};e.publicToken=b,e.config=c||{};var f=document.createElement("script");f.type="text/javascript",f.id="vrlps-js",f.defer=!0,f.src="https://app.viral-loops.com/client/vl/vl.min.js";var g=document.getElementsByTagName("script")[0];return g.parentNode.insertBefore(f,g),f.onload=function(){a.setup(e),a.instances[b]=e},e.identify=e.identify||function(a,b){e.afterLoad={identify:{userData:a,cb:b}}},e.pendingEvents=[],e.track=e.track||function(a,b){e.pendingEvents.push({event:a,cb:b})},e.pendingHooks=[],e.addHook=e.addHook||function(a,b){e.pendingHooks.push({name:a,cb:b})},e.$=e.$||function(a){e.pendingHooks.push({name:"ready",cb:a})},e}))}();
		var campaign = VL.load("KdRPeCOg7275SRW_pLVJ0FTFSDI");
		
	}
	
    render() {	
		 return (
			<div>
			Here
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    messages : state.messages
  };
};

const connectedContainer = connect(mapStateToProps)(Referral);
const RoutedContainer = withRouter(connectedContainer);
export default RoutedContainer;
