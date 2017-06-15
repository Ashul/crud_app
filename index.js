// call the packages we need
var express = require('express');
//define app
var app = express();
//call blog.js file
var Blog = require('./model/blog.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit:'10mb', extend:true}))

// view all blog
app.get('/', function(req, res){
   Blog.find(function (err, blog) {
    if (!err) {
        res.send(blog);
    } else {
        console.log(err);
    }
  });
});

//view single blog
app.get('/blog/:id', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(!err){
        res.send(blog);
    }
    else{
         console.log(err)
    }
  })
});


// create a single Blog
app.post('/blog/create', function(req, res){
var blog;
blog = new Blog({
    title             :  req.body.title,
    subTitle          :  req.body.subTitle,
    blogBody          :  req.body.blogBody,

}) ;
var today = Date.now();
blog.created = today;


var author = {fullname:req.body.authorFullname, email:req.body.authorEmail};
blog.authorInfo = author;


blog.save(function(err){
  if(!err){
    console.log('created');
  }
  else{
     console.log(err)
  }
}) ;
    res.send(blog)
});

//edit a blog
app.put('/blog/:id/edit', function(req, res){
   Blog.findById(req.params.id, function(err, blog){
    blog.title             =  req.body.title,
    blog.subTitle          =  req.body.subTitle,
    blog.blogBody          =  req.body.blogBody
   
var today = Date.now();
blog.lastModified = today;

var author = {fullname:req.body.authorFullname, email:req.body.authorEmail};
blog.authorInfo = author;
   
   blog.save(function(err){
  if(!err){
    console.log('updated');
  }
  else{
    console.log(err)
  }
   res.send(blog)
})
});
});

//delete a blog
app.post('/blog/:id/delete', function(req, res){
 Blog.findById(req.params.id, function(err, blog){
     blog.remove(function(err){
      if(!err){
        console.log('removed');
         res.send('')

      }
      else{
        console.log(err)
      }
    })
})
});

app.listen(8000);


