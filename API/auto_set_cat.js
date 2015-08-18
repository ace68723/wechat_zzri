var Q 				= require('q')
var fb_info		= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');


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

function auto_set_cat (cats_data) {
	var deferred = Q.defer();
	
	var rid;
		rid = cats_data[0].rid;
		
	get_rr_data(rid).then(function(result) {
		rr_data = result;
		console.log('001 result',rr_data)


		_.forEach(cats_data, function(cat_data,key) {
			var k =0;
			var data 		= {};
			data.cat 		= {};
			data.rcmd_name  = cat_data.rcmd_name;
			// console.log('data.rcmd_name',data.rcmd_name)
			data.cat.name   = cat_data.cat_name;
			// console.log('rr_data.recommend',rr_data.recommend)
			data.rcmd_id = _.findKey(rr_data.recommend, function(re) {
  				return re.recommend_name == data.rcmd_name;
			});
			 // console.log('res',data.rcmd_id)
			fb_recommend.add_cat(rid,data.rcmd_id,data.cat)
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

		})
	
	});// get	

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