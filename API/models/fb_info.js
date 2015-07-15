var Q 			= require('q')
var Firebase 	= require('firebase');
var dataRef		= new Firebase('https://liang-node-test.firebaseio.com/');
var rrclient_ref 	= dataRef.child("rrclient");
var blog_ref 	= dataRef.child("blog");


function set_info(rid,info){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		console.log(rid)
		rrclient_ref.child(rid).child('info').set(info, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function get_info (rid) {
		var deferred = Q.defer();

		rrclient_ref.child(rid).child("info").on("value", function(snapshot) {
		 	var info = snapshot.val();
		  	console.log(info)
		  	deferred.resolve(info);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}

function remove_info(rid){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		console.log(rid)
		rrclient_ref.child(rid).child("info").remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

module.exports	=	{
	set_info 		: set_info,
	remove_info		: remove_info,
	get_info		: get_info
}