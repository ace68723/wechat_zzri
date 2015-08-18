var Q 				= require('q')
var fb_info		= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');
var Firebase 	= require('firebase');
var dataRef		= new Firebase('https://liang-node-test.firebaseio.com/');
var rrclient_ref 	= dataRef.child("rrclient");



var rr_data;
var asd = this;
function check_id (rid) {
	var deferred = Q.defer(); // check_id promise start
		var data = []
		data.rid  		= {}
		rr_data  = [];
		fb_recommend.get_rrclient()
		.then(function (result) {
			// console.log('result',result)
			var rrclient_data = result;
				// console.log('rrclient_data',rrclient_data)
			_.forEach(rrclient_data,function (rrclient,key) {
				data = []
				data.rid  			= key;
				
				// var recommend_data 	= rrclient.recommend
				
				if (key == rid){
					// console.log('111',rrclient)
					rr_data = rrclient;
				}
				
			})
			// console.log('rr_data',rr_data)
			deferred.resolve(rr_data);// check_id promise resolve
		})

		.catch(function(error) {
			deferred.reject(error);// check_id promise reject
		});

	
return deferred.promise;		// check_id promise end
}

function get_rr_data  (rid) {
	var deferred = Q.defer();
	//console.log('get rr data',rr_data)
		if(rr_data !== undefined){
			 deferred.resolve(rr_data);
		}else{
			check_id(rid)
			.then(function(result) {
				//console.log(result)
				 deferred.resolve(result);
										  
			})
			.catch(function(error) {
				console.log(error)
				 deferred.reject(error);
			});
		}
	return deferred.promise;		
}
var cat_data;
function get_cat_data (rid,rcmd_id) {
	var deferred = Q.defer();
	fb_recommend.get_cat(rid,rcmd_id)
		.then(function (result) {
			// console.log('result',result)
			 cat_data = result;
				// console.log('rrclient_data',rrclient_data)
			
			deferred.resolve(rr_data);// check_id promise resolve
		})

		.catch(function(error) {
			deferred.reject(error);// check_id promise reject
		});
		return deferred.promise;
}

function auto_set_dish (dishs_data) {
	var deferred = Q.defer();
	var rid;
		rid = dishs_data[0].rid;
	get_rr_data(rid).then(function(result) {
		rr_data = result;
		console.log('001 result',rr_data)


		_.forEach(dishs_data, function(dish_data,key) {
			
			var data 		= {};
			data.dish 		= {};
			data.rcmd_name  = dish_data.rcmd_name;
			// console.log('data.rcmd_name',data.rcmd_name)
			data.cat_name   = dish_data.cat_name;
			data.dish.name = dish_data.dish_name;
			data.dish.date = dish_data.date;
			data.dish.content = dish_data.content;
			// console.log('rr_data.recommend',rr_data.recommend)
			data.rcmd_id = _.findKey(rr_data.recommend, function(re) {
  				return re.recommend_name == data.rcmd_name;
			});
			  console.log('res',data.rcmd_id)

			 fb_recommend.get_cat(rid,data.rcmd_id)
			 .then(function  (result) {
			 	console.log('result1',result)
			 	data.cat_id = _.findKey(result, function(re) {
  					return re.name == data.cat_name;
				});
				console.log('res2',data.cat_id )
				fb_recommend.add_dish(rid,data.rcmd_id,data.cat_id,data.dish)
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

			 })
			 .catch(function(error) {
					console.log(error)
					deferred.reject('error', error);
				});

			
		})
	
	});// get	
	
	

	return deferred.promise;
	
}



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










