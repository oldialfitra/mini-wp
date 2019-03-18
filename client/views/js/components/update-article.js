Vue.component('update-article', {
    props: ['update-title', 'update-content'],
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    methods: {
        update() {
            this.$emit('updated', [this.updateTitle, this.updateContent])
        }
    },
    template: `
    <div class="update">
        <h2>Update Article</h2>
        <form v-on:submit.prevent="update">
            <input v-model="updateTitle" placeholder="Title"><br>
            <wysiwyg v-model="updateContent" />
            <br><br>
            <input type="submit" value="Submit">
        </form>
    </div>
    `
})