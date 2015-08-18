var Q 				= require('q')
var fb_info		= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');



function check_id () {
	var deferred = Q.defer(); // check_id promise start
		var data = []
		data.rid = {}
		rr_data  = [];
		fb_recommend.get_rrclient()
		.then(function (result) {
			var rrclient_data = result;
				console.log('rrclient_data',rrclient_data)
			_.forEach(rrclient_data,function (rrclient,key) {
				data = []
				data.rid  			= key;

				var recommend_data 	= rrclient.recommend
				
				_.forEach(recommend_data,function(recommend,key) {
					var lo_recommend 	= {};
					
					lo_recommend.name 	= recommend.recommend_name;
					lo_recommend.key	= key;
					lo_cat_data 		= recommend.cat
					data.push(lo_recommend)

				})
				rr_data.push(data);
				 deferred.resolve(rr_data);// check_id promise resolve
			})
		})

		.catch(function(error) {
			deferred.reject(error);// check_id promise reject
		});

	
return deferred.promise;		// check_id promise end
}

function auto_set_recommend (recommends_data) {
	var deferred = Q.defer();
	_.forEach(recommends_data, function(recommend_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 	= {};
		data.rcmd_content 	= {};
		data.rid 		= recommend_data.rid;
		data.rcmd_content.recommend_name = recommend_data.recommend_name;
		fb_recommend.add_recommend(data.rid, data.rcmd_content)
			.then(function(result) {
				console.log(result)
				if (recommend_data.length - 1 === key) {
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

fs.readFile('./json/recommend.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var recommends_data = JSON.parse(data)
  auto_set_recommend(recommends_data)
  	.then(function(result) {
  		console.log('auto_set_recommend result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_recommend error',error)
  	});
});



