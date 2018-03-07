'use strict';

module.exports = {
	id 		: 'framework_service_instant_services_status_check',
	instant : true,
	do 		: function (app) {
		if(service().debug) l('Running (Instant)Service - ' + this.id);
	}
}




