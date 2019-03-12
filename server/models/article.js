const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Wordpress', { useNewUrlParser: true })
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: String,
    content: String,
    created_at: Date
})

const Article = mongoose.model('Articles', articleSchema)
module.exports = Article