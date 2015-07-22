var Q 				= require('q')
var fb_info			= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');


function auto_set_info (infos_data) {
	var deferred = Q.defer();
	_.forEach(infos_data, function(info_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 		= {};
		data.info 		= {};
		data.rid 		= info_data.rid;
		data.info.addr 	= info_data.info_addr;
		data.info.tel 	= info_data.info_tel;
		data.info.wechat= info_data.info_wechat; 
		fb_info.set_info(data.rid, data.info)
			.then(function(result) {
				console.log(result)
				if (info_data.length - 1 === key) {
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


fs.readFile('./json/info.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var infos_data = JSON.parse(data)
  auto_set_info(infos_data)
  	.then(function(result) {
  		console.log('auto_set_info result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_info error',error)
  	});
});