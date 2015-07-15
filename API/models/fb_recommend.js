var Q 			= require('q')
var Firebase 	= require('firebase');
var dataRef		= new Firebase('https://liang-node-test.firebaseio.com/');
var rrclient_ref 	= dataRef.child("rrclient");
var blog_ref 	= dataRef.child("blog");

function set_recommend(rid,content) {
	var deferred = Q.defer();
		
		console.log(content)
		rrclient_ref.child(rid).set(content, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function get_recommend (rid) {
		var deferred = Q.defer();

		rrclient_ref.child(rid).on("value", function(snapshot) {
		 	var recommend = snapshot.val();
		  	console.log(recommend)
		  	deferred.resolve(blog);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}

function remove_recommend(rid){
	var deferred = Q.defer();
		console.log(rid)
		rrclient_ref.child(rid).child(content).remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}


module.exports	=	{
	set_recommend 	: set_recommend,
	get_recommend	: get_recommend,
	remove_recommend: remove_recommend
}