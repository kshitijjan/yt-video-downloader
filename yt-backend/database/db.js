// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://admin:mongodb12@cluster0.9hqfpfp.mongodb.net/youtube',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then( () => console.log('Connected to MongoDB'))
// .catch( (err) => console.log('Could not connect to database', err));

// const videoSchema = new mongoose.Schema({
//     url: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     title: String,
//     description: String,
//     thumbnail: String
// })

// module.exports = mongoose.model('Video', videoSchema);