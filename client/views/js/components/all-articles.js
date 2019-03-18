Vue.component('all-articles', {
    data() {
        return {
            id: ''
        }
    },
    props: ['articles', 'user'],
    template: `
    <div class="list">
        <h2>List of Articles</h2>
        <div class="card" style="max-width:80%" v-for="(item, index) in articles">
            <span style="color:black;font-weight:bolda;text-align:center;border-bottom: double;">{{item.title}}</span>
            <img class="card-img-right" v-bind:src="item.image">
            <span style="color:black;font-weight:normal" v-html="item.content"></span>
            <span style="color:black;font-weight:lighter;">{{item.created_at.slice(0, 10)}}</span>
            <div v-if="user===item.userId._id">
                <button v-on:click="getOne(item._id)"><i class="fas fa-pen" ></i></button>
                <button v-on:click="deleteOne(item._id, index)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    </div>`,
    methods: {
        getOne(articleId) {
            this.$emit('get-one-article', this.id = articleId)
        },
        deleteOne(articleId, index) {
            this.$emit('delete-one-article', [this.id = articleId, index])
        }
    },
})