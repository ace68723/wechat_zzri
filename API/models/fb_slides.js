var Q 				= require('q')
var Firebase 		= require('firebase');
var _				= require('lodash');




var dataRef			= new Firebase('https://liang-node-test.firebaseio.com/');
var rrclient_ref 	= dataRef.child("rrclient");
var blog_ref 		= dataRef.child("blog");




function set_priority (rid,slides,priority) {
	var k = 0;

	var deferred = Q.defer();


		_.forEach(slides, function(slide, key) {
			
			var slides_id 	= key
		  	priority 		= k;
		  	rrclient_ref.child(rid).child("slides").child(slides_id).setPriority(priority);
		  	k += 1;
		  	
		});
		 deferred.resolve("Data saved successfully.");
		
    return deferred.promise;
   
}



function set_slides (rid,slides) {

	// add a new slide.
	var deferred = Q.defer();
		
		console.log(slides)
		rrclient_ref.child(rid).child("slides").push(slides, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function update_slides (rid,slides_id,slides) {

	// add a new slide.
	var deferred = Q.defer();
		
		console.log(slides)
		rrclient_ref.child(rid).child("slides").child(slides_id).set(slides, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function get_slides (rid) {
	// get all slides.
		var deferred = Q.defer();

		rrclient_ref.child(rid).child("slides").on("value", function(snapshot) {
		 	var slides = snapshot.val();
		  	console.log(slides)
		  	deferred.resolve(slides);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function remove_slides(rid,slides_id){
	var deferred = Q.defer();
		console.log(rid)
		rrclient_ref.child(rid).child("slides").child(slides_id).remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

module.exports	=	{
	set_slides 		: set_slides,
	get_slides		: get_slides,
	remove_slides	: remove_slides,
	update_slides	: update_slides,
	set_priority	: set_priority
}