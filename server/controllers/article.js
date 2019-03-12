const article = require('../models/article')
const jwt = require('jsonwebtoken')

class Article {

    static addArticle(req, res) {
        article.create({
                title: req.body.title,
                content: req.body.content,
                created_at: new Date()
            })
            .then(function(newArticle) {
                res.status(201).json(newArticle)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static getArticle(req, res) {
        article.find()
            .then(function(articles) {
                res.status(200).json(articles)
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