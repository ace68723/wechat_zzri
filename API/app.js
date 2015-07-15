var express 	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var fb_info		= require('./models/fb_info');
var fb_name 	= require('./models/fb_name');
var fb_blog		= require('./models/fb_blog');
var fb_recommend	= require('./models/fb_recommend');
var fb_slides	= require('./models/fb_slides');
var app 		= express();

app.use(cors());
app.use(bodyParser.json());


app.listen(3011,function() {
	console.log('node_test listening on 3011');
});


app.post('/set_info',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var info = client_data.info;
	console.log(rid);

	fb_info.set_info(rid, info)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/set_name',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var name = client_data.name;
	console.log(rid);

	fb_name.set_name(rid, name)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/set_slides',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var slides = client_data.slides;
	console.log(rid);

	fb_slides.set_slides(rid, slides)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})



app.post('/update_slides',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var slides_id = client_data.slides_id;
	var slides = client_data.slides;
	console.log(rid);

	fb_slides.update_slides(rid, slides_id,slides)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/set_recommend',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var content = client_data.content;
	console.log(rid);

	fb_recommend.set_slides(rid, content)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/set_priority',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var slides = client_data.slides;
	console.log(rid);

	fb_slides.set_priority(rid, slides)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/update_blog',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var blog_content = client_data.blog_content;
	// var title = blog_content.title;
	// var content = blog_content.content;
	var blog_id = blog_content.blog_id;
	console.log(rid);

	fb_blog.update_blog(rid,blog_id,blog_content)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})



app.post('/add_blog',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var blog_content = client_data.blog_content;
	// var title = blog_content.title;
	// var content = blog_content.content;
	// var blog_id = blog_content.blog_id;
	console.log(rid);

	fb_blog.add_blog(rid,blog_content)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/get_blog_list',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	console.log(rid);

	fb_blog.get_blog_list(rid)
		.then(function(blog) {
			console.log(blog)
			res.status(200).send(blog);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/get_blog_content',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	var blog_id			= client_data.blog_id;
	console.log(rid);

	fb_blog.get_blog_content(rid,blog_id)
		.then(function(blog) {
			console.log(blog)
			res.status(200).send(blog);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})



app.post('/get_info',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	console.log(rid);

	fb_info.get_info(rid)
		.then(function(blog) {
			console.log(blog)
			res.status(200).send(blog);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/get_name',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	console.log(rid);

	fb_name.get_name(rid)
		.then(function(blog) {
			console.log(blog)
			res.status(200).send(blog);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/get_slides',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	console.log(rid);

	fb_slides.get_slides(rid)
		.then(function(blog) {
			console.log(blog)
			res.status(200).send(blog);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/get_recommend',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	console.log(rid);

	fb_recommend.get_recommend(rid)
		.then(function(blog) {
			console.log(blog)
			res.status(200).send(blog);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/remove_info',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var info = client_data.info;
	console.log(rid);

	fb_info.remove_info(rid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/remove_name',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var name = client_data.name;
	console.log(rid);

	fb_name.remove_name(rid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})



app.post('/remove_slides',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var slides_id = client_data.slides_id;
	console.log(rid);

	fb_slides.remove_slides(rid,slides_id)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/remove_recommend',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var content = client_data.content;
	console.log(rid);

	fb_recommend.remove_recommend(rid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/remove_blog_list',function(req,res) {
	// remove all blogs.
	var client_data = req.body;
	var rid = client_data.rid;
	console.log(rid);

	fb_blog.remove_blog_list(rid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/remove_blog_content',function(req,res) {
	// remove the specific blog.
	var client_data = req.body;
	var rid = client_data.rid;
	var blog_id = client_data.blog_id;
	console.log(rid);

	fb_blog.remove_blog_content(rid,blog_id)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})