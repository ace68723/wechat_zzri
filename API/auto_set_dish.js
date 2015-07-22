var Q 				= require('q')
var fb_info		= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');

function auto_set_dish (dishs_data) {
	var deferred = Q.defer();
	_.forEach(dishs_data, function(dish_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 		= {};
		data.dish_con   = {};
		data.rid 		= dish_data.rid;
		data.rcmd_id 	= dish_data.rcmd_id;
		data.cat_id		= dish_data.cat_id;
		data.dish_con.dish_name=dish_data.dish_name;
		data.dish_con.date=dish_data.date;
		data.dish_con.content=dish_data.content;


		fb_recommend.add_dish(data.rid,data.rcmd_id,data.cat_id,data.dish_con)
			.then(function(result) {
				console.log(result)
				if (dish_data.length - 1 === key) {
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

// read file 
fs.readFile('./json/dish.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var dishs_data = JSON.parse(data)
  auto_set_dish(dishs_data)
  	.then(function(result) {
  		console.log('auto_set_dish result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_dish error',error)
  	});
});