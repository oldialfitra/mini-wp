// $(document).ready(function() {
//     $('.add').hide()
// })


// function listArticle() {
//     $('.list').show()
//     $('.add').hide()
// }

// function addArticle() {
//     $('.list').hide()
//     $('.add').show()
// }

let url = 'http://localhost:3000/articles'

let app = new Vue({
    el: '#app',
    data: {
        id: 0,
        articleTitle: '',
        articleContent: '',
        created_at: '',
        articles: [],
        updateTitle: '',
        updateContent: '',
        seenList: true,
        seenAdd: false,
        seenUpdate: false
    },
    methods: {
        showAddArticle() {
            if (!this.seenAdd) {
                this.seenAdd = true
                this.seenList = false
            }
        },
        showListArticle() {
            if (!this.seenList) {
                this.seenList = true
                this.seenAdd = false
            }
        },
        showUpdateArticle() {
            if (!this.seenUpdate) {
                this.seenUpdate = true
                this.seenList = false
                this.seenAdd = false
            }
        },
        addArticle() {
            console.log(this.articleTitle)
            console.log(this.articleContent)
                // let { title, content, created_at } = this
            axios.post(url, {
                    title: this.articleTitle,
                    content: this.articleContent,
                    created_at: new Date()
                })
                .then(({ data }) => {
                    console.log(data)
                    this.articles.unshift(data)
                    this.articleTitle = ''
                    this.articleContent = ''
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteArticle(id, index) {
            axios.delete(`${url}/${id}`)
                .then((data) => {
                    this.articles.splice(index, 1)
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getOneArticle(id) {
            axios.get(`${url}/${id}`)
                .then(({ data }) => {
                    console.log(data)
                    this.updateTitle = data.title
                    this.updateContent = data.content
                    this.seenUpdate = true
                    this.seenList = false
                    this.seenAdd = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updateArticle(id) {
            axios.put(`${url}/${id}`, {
                    title: this.updateTitle,
                    content: this.updateContent
                })
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    created() {
        axios.get(url)
            .then((data) => {
                this.articles = data.data
                console.log(this.articles)
            })
            .catch((err) => {
                console.log(err)
            })
    }
})