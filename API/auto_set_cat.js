var Q 				= require('q')
var fb_info		= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');

function auto_set_cat (cats_data) {
	var deferred = Q.defer();
	_.forEach(cats_data, function(cat_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 		= {};
		data.cat 		= {};
		data.rid 		= cat_data.rid;
		data.rcmd_id	= cat_data.rcmd_id;
		data.cat.name   = cat_data.cat_name;
		fb_recommend.add_cat(data.rid,data.rcmd_id,data.cat)
			.then(function(result) {
				console.log(result)
				if (cat_data.length - 1 === key) {
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


fs.readFile('./json/cat.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var cats_data = JSON.parse(data)
  auto_set_cat(cats_data)
  	.then(function(result) {
  		console.log('auto_set_cat result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_cat error',error)
  	});
});