var Q 				= require('q')
var fb_info		= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');

function auto_set_name (names_data) {
	var deferred = Q.defer();
	_.forEach(names_data, function(name_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 		= {};
		data.name 		= {};
		data.rid 		= name_data.rid;
		data.name 	 	= name_data.name;
		fb_name.set_name(data.rid, data.name)
			.then(function(result) {
				console.log(result)
				if (name_data.length - 1 === key) {
					deferred.resolve('ok');
				};
			})
			.catch(function(error) {
				console.log(error)
				deferred.reject('error', error);
			});



	});

	return deferred.promise;
	
}


fs.readFile('./json/name.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var names_data = JSON.parse(data)
  auto_set_name(names_data)
  	.then(function(result) {
  		console.log('auto_set_name result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_name error',error)
  	});
});