'use strict';

var startTime 	= new Date(Date.now() + 5000);
var endTime 	=  new Date(startTime.getTime() + 5000);

module.exports = {
	id 		: 'framework_service_services_status_check',
	instant : false,
	do 		: function (app) {
		if(service().debug) l('Running Service - ' + this.id);
	},
	config 	: { 
		start: startTime,
		//end: endTime,
		rule: '*/1 * * * * *'
		// _______________________________________________
		// */1  */1   	*/1    	*/1        	*/1
		// Sec	Min		Hour 	Day/Month	Month Day/Week
	}
}




