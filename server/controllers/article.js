const article = require('../models/article')

class Article {

    static addArticle(req, res) {
        console.log('add')
        console.log(req.file)
        article.create({
                title: req.body.title,
                content: req.body.content,
                created_at: new Date(),
                image: req.file.cloudStoragePublicUrl,
                userId: req.body.userId
            })
            .then(function(newArticle) {
                res.status(201).json(newArticle)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static getArticle(req, res) {
        // console.log("kkkkkkmo=================");
        // console.log(req.headers)
        article.find().populate('userId')
            .then(function(articles) {
                console.log(articles)
                articles.reverse()
                res.status(200).json(articles.reverse())
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static getOne(req, res) {
        article.findById(req.params.id)
            .then(function(article) {
                res.status(200).json(article)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static updateArticle(req, res) {
        article.findByIdAndUpdate(req.params.id, req.body)
            .then(function(article) {
                res.status(200).json(article)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static deleteArticle(req, res) {
        article.findByIdAndDelete(req.params.id)
            .then(function(article) {
                res.status(200).json(article)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

}

module.exports = Article