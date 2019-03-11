$(document).ready(function() {
    $('.add').hide()
})


function listArticle() {
    $('.list').show()
    $('.add').hide()
}

function addArticle() {
    $('.list').hide()
    $('.add').show()
}