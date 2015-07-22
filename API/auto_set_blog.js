var Q 				= require('q')
var fb_info			= require('./models/fb_info');
var fb_name 		= require('./models/fb_name');
var fb_blog			= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides		= require('./models/fb_slides');
var _				= require('lodash');
var fs 				= require('fs');


function auto_set_blog (blogs_data) {
	var deferred = Q.defer();
	// console.log("auto_set_blog",blog_data)
	_.forEach(blogs_data, function(blog_data, key) {

		// console.log('blog_data',blog_data)
		
		var data 			= {};
		data.blog 			= {};
		data.rid 			= blog_data.rid;
		data.blog.content 	= blog_data.blog_content;
		data.blog.name 		= blog_data.blog_name;

		fb_blog.add_blog(data.rid, data.blog)
			.then(function(result) {
				console.log(result)
				if (blog_data.length - 1 === key) {
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






fs.readFile('./json/blog.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var blogs_data = JSON.parse(data)
  auto_set_blog(blogs_data)
  	.then(function(result) {
  		console.log('auto_set_blog result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_blog error',error)
  	});
});