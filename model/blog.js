// Invoke mongoose module
var mongoose = require('mongoose');

//connect to database
var dbURI = 'mongodb://localhost/blog';

//open the connection
mongoose.connect(dbURI); 

// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
});

//create a schema
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title             :               {type:String, default:''},
    subTitle          :               {type:String, default:''},
    blogBody          :               {type:String, default:''},
    created           :               {type:Date},
    lastModified      :               {type:Date},
    authorInfo        :               {}

});

//create a model
var Blog = mongoose.model('blog', blogSchema);

//export the model
module.exports = Blog

