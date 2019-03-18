Vue.component('add-article', {
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    data() {
        return {
            article: {
                title: '',
                content: '',
                image: ''
            }
        }
    },
    methods: {
        addArticle() {
            console.log(this.$refs.file.files[0])
            this.article.image = this.$refs.file.files[0]
                // this.image = this.$refs.file.files[0];
            this.$emit('add-new-article', this.article)
        }
    },
    template: `
    <div class="add">
        <h2>Add Article</h2>
        <form v-on:submit.prevent="addArticle">
            <input v-model="article.title" placeholder="Title" class="form-control"><br>
            <wysiwyg v-model="article.content" /><br>
            <label for="exampleInputFile">File input</label>
            <input type="file" class="mt-3" id="file" ref="file"></input>
            <br><br>
            <input type="submit" value="Submit">
        </form>
    </div>
    `
})