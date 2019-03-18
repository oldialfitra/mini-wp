const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Wordpress', { useNewUrlParser: true })
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    created_at: Date,
    image: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Article = mongoose.model('Articles', articleSchema)
module.exports = Article