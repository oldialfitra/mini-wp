const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routerArticle = require('./routes/article')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/articles', routerArticle)

app.listen(port, function() {
    console.log('Listening on port', port)
})