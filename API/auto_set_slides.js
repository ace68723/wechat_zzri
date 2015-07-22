var Q 				= require('q')
var fb_info			= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');

// var slides_data = [	{"rid":"10","slides_des":"img des","slides_img":"img addr"},
// 					{"rid":"10","slides_des":"img des2","slides_img":"img addr"},
// 					{"rid":"11","slides_des":"img des3 ","slides_img":"img addr"}]


function auto_set_slides (slides_data) {
	var deferred = Q.defer();
	// console.log("auto_set_slides",slides_data)
	_.forEach(slides_data, function(slide_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 	= {};
		data.slides = {};
		data.rid 	= slide_data.rid;
		data.slides.des = slide_data.slides_des;
		data.slides.img = slide_data.slides_img;
		fb_slides.set_slides(data.rid, data.slides)
			.then(function(result) {
				console.log(result)
				if (slides_data.length - 1 === key) {
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






fs.readFile('./json/slides.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var slides_data = JSON.parse(data)
  auto_set_slides(slides_data)
  	.then(function(result) {
  		console.log('auto_set_slides result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_slides error',error)
  	});
});