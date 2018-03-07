var helper = helper || {};
/*
helper.utility = function(){
	return {
		random 	: function (max) {
			max = max || 100;
			return Math.random() * max;
		}	
	};
};
*/
helper.utility = function(){
	return {
		random 	: function(){
			return {
				value : function (max) {
					max = max || 100;
					return Math.random() * max;
				},
				list : function (max) {
					max = max || 10;
					var _list = [];
					for(var i = 0; i < max; i++) _list[i] = 'List Item ' + parseInt(Math.random() * max * 10);
					return JSON.stringify(_list);
				}
			}
		}
	};
};

module.exports = helper;