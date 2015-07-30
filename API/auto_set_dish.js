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
function check_id () {
	var deferred = Q.defer(); // check_id promise start
		var data = []
		data.rid  		= {}
		rr_data  = [];
		fb_recommend.get_rrclient()
		.then(function (result) {
			var rrclient_data = result;
				// console.log('rrclient_data',rrclient_data)
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
					
					_.forEach(lo_cat_data ,function(cat,key) {
						var lo_cat 		= {};
						lo_cat.name 	= cat.name;
						lo_cat.key		= key; 
					data.push(lo_cat)

					})


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


function get_rr_data  () {
	var deferred = Q.defer();
	console.log('get rr data',rr_data)
		if(rr_data !== undefined){
			 deferred.resolve(rr_data);
		}else{
			check_id()
			.then(function(result) {
				console.log(result)
				 deferred.resolve(result);
										  
			})
			.catch(function(error) {
				console.log(error)
				 deferred.reject(error);
			});
		}
	return deferred.promise;		
}



function auto_set_dish (dishs_data) {
	var deferred = Q.defer();
	

	get_rr_data().then(function(result) {
		console.log('auto_set_dish',result)
		rr_data = result;
		
	})
	.catch(function(error) {
		console.log(error)
		// deferred.reject('error', error);
	});

	_.forEach(dishs_data, function(dish_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 		= {};
		data.dish_con   = {};
		data.rid 		= dish_data.rid;
		data.rcmd_name 	= dish_data.rcmd_name;
		data.cat_name 	= dish_data.cat_name;
		data.dish_con.dish_name=dish_data.dish_name;
		data.dish_con.date=dish_data.date;
		data.dish_con.content=dish_data.content;





		_.forEach(rr_data,function(r_data) {
			console.log('rr',r_data)
			if (r_data.rid == data.rid){
				_.forEach(rr_data[r_data.rid], function(key_data) {
					if (key_data.name == data.rcmd_name){
						var rcmd_id  =  key
					}
					else if (key_data.name == data.cat_name){
						var cat_id  =  key
					}
					else{
						check_id();
					}
				})	
			}
			
		})



		// fb_recommend.add_dish(data.rid,rcmd_id,cat_id,data.dish_con)
		// 	.then(function(result) {
		// 		console.log(result)
		// 		if (dish_data.length - 1 === key) {
		// 			deferred.resolve('ok');
		// 		};
		// 	})
		// 	.catch(function(error) {
		// 		console.log(error)
		// 		deferred.reject('error', error);
		// 	});



	   });

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










