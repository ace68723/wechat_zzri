var Q 			= require('q')
var Firebase 	= require('firebase');
var dataRef		= new Firebase('https://liang-node-test.firebaseio.com/');
var rrclient_ref 	= dataRef.child("rrclient");
var blog_ref 	= dataRef.child("blog");


function set_name (rid,name) {
	var deferred = Q.defer();
		
		console.log(name)
		rrclient_ref.child(rid).child('name').set(name, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}



function get_name (rid) {
		var deferred = Q.defer();

		rrclient_ref.child(rid).child("name").on("value", function(snapshot) {
		 	var name = snapshot.val();
		  	console.log(name)
		  	deferred.resolve(name);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}

function remove_name(rid){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		console.log(rid)
		rrclient_ref.child(rid).child("name").remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

module.exports	=	{

	set_name 		: set_name,
	get_name		: get_name,
	remove_name		: remove_name
}