const groupToken 	= 'fa378b6d4ce17807aae290b33f2321ac3350c31c7a3087f76bdc6aa10fe3d2b9787d572a870931368cd79';
const groupID 	 	= 199989388;
const urlDB 	= 'mongodb+srv://abogusgames:aB9765234d2016d@cluster0.k0bin.mongodb.net/abogusgames?retryWrites=true&w=majority';
const nameDB = 'abogusgames' 
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/test', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});
module.exports = {
  groupToken,
  groupID,

  urlDB,
  nameDB
};