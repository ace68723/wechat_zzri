var Q 			= require('q')
var Firebase 	= require('firebase');
var dataRef		= new Firebase('https://liang-node-test.firebaseio.com/');
var rrclient_ref 	= dataRef.child("rrclient");
var dish_ref 	= dataRef.child("dish");
var cat_ref 	= dataRef.child("cat");
function add_dish(rid,rcmd_id,cat_id,dish_content) {
	var deferred = Q.defer();
	var new_dish_Ref = dish_ref.child(rid).push(dish_content,function (error) {
						if (error){
							deferred.reject("Data could not be saved." + error);
						}else{
							var key = new_dish_Ref.key()
							rrclient_ref.child(rid).child("recommend").child(rcmd_id)
							.child("cat").child(cat_id).child("dish").child(key).set(true,function (error) {
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

function update_dish(rid,rcmd_id,cat_id,dish_id,dish_content) {
	var deferred = Q.defer();
	var new_dish_Ref = dish_ref.child(rid).child(dish_id).set(dish_content,function (error) {
						if (error){
							deferred.reject("Data could not be saved." + error);
						}else{
							console.log(cat_id)

							rrclient_ref.child(rid).child("recommend").child(rcmd_id)
							.child("cat").child(cat_id).child("dish").child(dish_id).set(dish_content,function (error) {
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

function add_cat(rid,rcmd_id,cat_content){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		console.log('add cat',rid,rcmd_id,cat_content)
		rrclient_ref.child(rid).child('recommend').child(rcmd_id).child("cat").push(cat_content, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}
function update_cat(rid,rcmd_id,cat_id,cat_content){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		console.log('add cat',rid,rcmd_id,cat_content)
		rrclient_ref.child(rid).child('recommend').child(rcmd_id).child("cat").child(cat_id).set(cat_content, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}


function add_recommend(rid,rcmd_content){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		console.log(rid)
		rrclient_ref.child(rid).child('recommend').push(rcmd_content, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function update_recommend(rid,rcmd_id,rcmd_content){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		console.log(rid)
		rrclient_ref.child(rid).child('recommend').child(rcmd_id).set(rcmd_content, function(error) {
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

		rrclient_ref.child(rid).child("recommend").on("value", function(snapshot) {
		 	var recommend = snapshot.val();
		  	console.log(recommend)
		  	deferred.resolve(recommend);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function get_rrclient (rid) {
		var deferred = Q.defer();

		rrclient_ref.on("value", function(snapshot) {
		 	var rclient = snapshot.val();
		  	// console.log(rclient)
		  	deferred.resolve(rclient);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function get_cat (rid,rcmd_id) {
		var deferred = Q.defer();

		rrclient_ref.child(rid).child("recommend").child(rcmd_id).child("cat").on("value", function(snapshot) {
		 	var cat = snapshot.val();
		  	console.log(cat)
		  	deferred.resolve(cat);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function get_dish (rid, dish_id) {
		var deferred = Q.defer();

		dish_ref.child(rid).child(dish_id).on("value", function(snapshot) {
		 	var dish = snapshot.val();
		  	console.log('test dish',dish)
		  	deferred.resolve(dish);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function remove_recommend(rid){
	var deferred = Q.defer();
		console.log(rid)
		rrclient_ref.child(rid).child("recommend").remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}
function remove_dish_content(rid,rcmd_id,cat_id,dish_id) {
	var deferred = Q.defer();
	dish_ref.child(rid).child(dish_id).remove(function (error) {
						if (error){
							deferred.reject("Data could not be saved." + error);
						}else{
							console.log(cat_id)

							rrclient_ref.child(rid).child("recommend").child(rcmd_id)
							.child("cat").child(cat_id).child("dish").child(dish_id).remove(function (error) {
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
function remove_dish_list(rid,rcmd_id,cat_id,dish_id){
	var deferred = Q.defer();
		console.log(rid)
		rrclient_ref.child(rid).child("recommend").child(rcmd_id).child("cat").child(cat_id).child("dish").remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}


module.exports	=	{
	add_recommend :add_recommend,
	update_dish	: update_dish,
	add_cat		: add_cat,
	update_cat	: update_cat,
	add_dish	: add_dish,
	update_recommend : update_recommend,
	get_recommend	: get_recommend,
	get_cat		: get_cat,
	get_dish	: get_dish,
	remove_recommend: remove_recommend,
	remove_dish_content : remove_dish_content,
	remove_dish_list: remove_dish_list,
	get_rrclient	: get_rrclient
	
}