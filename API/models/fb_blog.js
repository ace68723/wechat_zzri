var Q 			= require('q')
var Firebase 	= require('firebase');
var dataRef		= new Firebase('https://vivid-heat-760.firebaseio.com/');
var rrclient_ref 	= dataRef.child("rrclient");
var blog_ref 	= dataRef.child("blog");


function update_blog(rid,blog_id,blog_content) {
	var deferred = Q.defer();

	var new_blog_Ref =	blog_ref.child(rid).child(blog_id).set(blog_content, function(error) {
							  if (error) {
							   
							     deferred.reject("Data could not be saved." + error);
							  } else {

								  	rrclient_ref.child(rid).child("blog").child(blog_id).child('title').set(blog_content.title, function(error) {
									  if (error) {
									   
									     deferred.reject("Data could not be saved." + error);
									  } else {
									   
									    deferred.resolve("Data saved successfully.");
									  }
									})
								}
							})
	

	return deferred.promise;
}


function add_blog (rid,blog_content) {
		var deferred = Q.defer();
		var new_blog_Ref =	blog_ref.push(blog_content, function(error) {
							  if (error) {
							   
							     deferred.reject("Data could not be saved." + error);
							  } else {
							  	console.log('blog key',new_blog_Ref.key())
							  	
								  	var key = new_blog_Ref.key()
								  	rrclient_ref.child(rid).child("blog").child(key).set(true, function(error) {
									  if (error) {
									   
									     deferred.reject("Data could not be saved." + error);
									  } else {
									   
									    deferred.resolve("Data saved successfully.");
									  }
									})
								}
							})


	return deferred.promise;

}
function get_blog_list (rid) {
		var deferred = Q.defer();

		rrclient_ref.child(rid).child('blog').on("value", function(snapshot) {
		 	var blog = snapshot.val();
		  	console.log('blog data',blog)
		  	deferred.resolve(blog);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}



function get_blog_content (rid, blog_id) {
		var deferred = Q.defer();

		blog_ref.child(rid).child(blog_id).on("value", function(snapshot) {
		 	var blog = snapshot.val();
		  	console.log('blog data',blog)
		  	deferred.resolve(blog);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function remove_blog_list(rid){
	var deferred = Q.defer();
		console.log(rid)
		rrclient_ref.child(rid).child("blog").remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function remove_blog_content(rid,blog_id){
	var deferred = Q.defer();
		console.log(rid)
		blog_ref.child(rid).child(blog_id).remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		  	console.log('blog key',blog_id)
		  	rrclient_ref.child(rid).child("blog").remove(function(error) {
		  		if (error) {
		  			deferred.reject("Data could not be saved." + error);
		  		} else {
		  			deferred.resolve("Data saved successfully.");
		  		}
		  	})
		  }
		});

	return deferred.promise;
}

module.exports	=	{
	update_blog 	: update_blog,
	add_blog 		: add_blog,
	get_blog_content: get_blog_content,
	get_blog_list	: get_blog_list,
	remove_blog_list: remove_blog_list,
	remove_blog_content:remove_blog_content
}