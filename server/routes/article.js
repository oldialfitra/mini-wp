const router = require('express').Router(),
    controllerArticle = require('../controllers/article')

router.post('/', controllerArticle.addArticle)

router.get('/', controllerArticle.getArticle)

router.delete('/:id', controllerArticle.deleteArticle)

router.put('/:id', controllerArticle.updateArticle)

router.get('/:id', controllerArticle.getOne)


module.exports = router