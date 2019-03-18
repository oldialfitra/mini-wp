Vue.component('side-bar', {
    methods: {
        changeToList() {
            this.$emit('change-list')
        },
        changeToAdd() {
            this.$emit('change-add')
        }
    },
    template: `
    <div>
        <nav id="sidebar">
            <ul class="list-unstyled components">
                <li>
                    <a href="#" v-on:click="changeToList">List</a>
                </li>
                <li>
                    <a href="#" v-on:click="changeToAdd">Add Article</a>
                </li>
            </ul>
        </nav>
    </div>
    `
})