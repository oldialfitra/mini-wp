const router = require('express').Router(),
    controllerArticle = require('../controllers/article'),
    authentication = require('../middlewares/authentication'),
    image = require('../helpers/images')

router.use('', authentication)

router.post('/', image.multer.single('image'), image.sendUploadToGCS, controllerArticle.addArticle)

router.get('/', controllerArticle.getArticle)

router.delete('/:id', controllerArticle.deleteArticle)

router.put('/:id', controllerArticle.updateArticle)

router.get('/:id', controllerArticle.getOne)

module.exports = router