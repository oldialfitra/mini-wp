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

let url = 'http://localhost:3000'

let app = new Vue({
    el: '#app',
    data: {
        articleId: '',
        currentUser: '',
        userEmail: '',
        userPassword: '',
        articleTitle: '',
        articleContent: '',
        created_at: '',
        articles: [],
        updateTitle: '',
        updateContent: '',
        seenList: false,
        seenAdd: false,
        seenUpdate: false,
        seenLogin: true,
        seenRegister: false,
        seenSideBar: false,
        seenNavBar: false
    },
    methods: {
        showAddArticle() {
            if (!this.seenAdd) {
                this.seenAdd = true
                this.seenList = false
                this.seenUpdate = false
            }
        },
        showListArticle() {
            if (!this.seenList) {
                this.seenList = true
                this.seenAdd = false
                this.seenUpdate = false
            }
        },
        showUpdateArticle() {
            if (!this.seenUpdate) {
                this.seenUpdate = true
                this.seenList = false
                this.seenAdd = false
            }
        },
        showRegisterUser() {
            if (!this.seenRegister) {
                this.userEmail = ''
                this.userPassword = ''
                this.seenRegister = true
                this.seenLogin = false
            }
        },
        showLoginUser() {
            if (!this.seenLogin) {
                this.userEmail = ''
                this.userPassword = ''
                this.seenLogin = true
                this.seenRegister = false
            }
        },
        login(payload) {
            console.log('masuk ke ologin')
            console.log(payload.userEmail)
                // console.log(this)
            axios.post(`${url}/users/login`, {
                    email: payload.userEmail,
                    password: payload.userPassword
                })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `Logged in`,
                        animation: true,
                        timer: 1500
                    })
                    console.log(data)
                        // this.id = data.id
                    this.userEmail = ''
                    this.userPassword = ''
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('id', data.id)
                    this.currentUser = localStorage.getItem('id')
                    this.seenLogin = false
                    this.seenList = true
                    this.seenNavBar = true
                    this.seenSideBar = true
                    this.allArticle()
                })
                .catch((err) => {
                    Swal.fire({
                        type: 'error',
                        title: err.response.data.message,
                        animation: true,
                        customClass: {
                            popup: 'animated tada'
                        },
                        timer: 1500
                    })
                    console.log(err)
                })
        },
        logout() {
            localStorage.clear()
                // localStorage.clear()
            this.seenList = false
            this.seenAdd = false
            this.seenUpdate = false
            this.seenLogin = true
            this.seenRegister = false
            this.seenSideBar = false
            this.seenNavBar = false
        },
        register(payload) {
            console.log(payload)
            console.log(this)
            axios.post(`${url}/users/register`, {
                    email: payload.userEmail,
                    password: payload.userPassword
                })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `Sign up success`,
                        animation: true,
                        timer: 1500
                    })
                    console.log(data)
                    this.userEmail = ''
                    this.userPassword = ''
                    this.seenLogin = true
                    this.seenRegister = false
                })
                .catch((err) => {
                    Swal.fire({
                        type: 'error',
                        title: 'Email already exists',
                        animation: true,
                        customClass: {
                            popup: 'animated tada'
                        },
                        timer: 1500
                    })
                    console.log(err)
                })
        },
        addArticle(payload) {
            let data = new FormData()
            data.append('title', payload.title)
            data.append('content', payload.content)
            data.append('created_at', new Date())
            data.append('image', payload.image)
            data.append('userId', localStorage.getItem('id'))
            console.log(payload)
                // axios.post(`${url}/articles`, data, {
                //         headers: { token: localStorage.getItem('token') },
                //         'Content-Type': 'multipart/form-data'
                //     })
            axios({
                    method: 'POST',
                    url: `${url}/articles`,
                    data,
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `Add article success`,
                        animation: true,
                        timer: 1500
                    })
                    this.showListArticle()
                    console.log(data)
                    this.articles.unshift(data)
                    this.articleTitle = ''
                    this.articleContent = ''
                    this.allArticle()
                })
                .catch((err) => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops, something wrong happen',
                        animation: true,
                        customClass: {
                            popup: 'animated tada'
                        },
                        timer: 1500
                    })
                    console.log(err)
                })
        },
        deleteArticle(payload) {
            console.log(payload)
            let index = payload[1]
            axios.delete(`${url}/articles/${payload[0]}`, {
                    headers: { token: localStorage.getItem('token') }
                })
                .then((data) => {
                    Swal.fire({
                        type: 'success',
                        title: `Delete article success`,
                        animation: true,
                        timer: 1500
                    })
                    this.articles.splice(index, 1)
                    this.allArticle()
                    console.log(data)
                })
                .catch((err) => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops, something wrong happen',
                        animation: true,
                        customClass: {
                            popup: 'animated tada'
                        },
                        timer: 1500
                    })
                    console.log(err)
                })
        },
        getOneArticle(payload) {
            console.log(payload)
            axios.get(`${url}/articles/${payload}`, {
                    headers: { token: localStorage.getItem('token') }
                })
                .then(({ data }) => {
                    console.log(data)
                        // this.$emit('update-title', 'update-content', '')
                    this.updateTitle = data.title
                    this.updateContent = data.content
                    this.seenUpdate = true
                    this.seenList = false
                    this.seenAdd = false
                    this.articleId = data._id
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updateArticle(payload) {
            console.log(payload)
            axios.put(`${url}/articles/${this.articleId}`, {
                    title: payload[0],
                    content: payload[1]
                }, {
                    headers: { token: localStorage.getItem('token') }
                })
                .then((data) => {
                    Swal.fire({
                        type: 'success',
                        title: `Update article success`,
                        animation: true,
                        timer: 1500
                    })
                    console.log(data)
                    this.allArticle()
                    this.showListArticle()
                })
                .catch((err) => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops, something wrong happen',
                        animation: true,
                        customClass: {
                            popup: 'animated tada'
                        },
                        timer: 1500
                    })
                    console.log(err)
                })
        },
        allArticle() {
            axios.get(`${url}/articles`, {
                    headers: { token: localStorage.getItem('token') }
                })
                .then((data) => {
                    console.log(localStorage.getItem('token'))
                    this.articles = data.data
                    console.log(this.articles)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    destroyed() {
        axios.get(`${url}/articles`)
            .then((data) => {
                this.articles = data.data
                console.log(this.articles)
            })
            .catch((err) => {
                console.log(err)
            })
    }
})