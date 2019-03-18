Vue.component('nav-bar', {
    methods: {
        logout() {
            this.$emit('user-logout')
        }
    },
    template: `
        <nav class="navbar">
            <div class="navbarlogo">
                <a href="#"><i class="fab fa-wordpress-simple" style="color: floralwhite"></i></a>
            </div>
            <div class="content">
                <h1>PressWord</h1>
            </div>
            <div class="media">
                <div class="media3 col-sm-12">
                    <a href="#"><i class="fas fa-sign-out-alt" style="color: floralwhite" v-on:click="logout"></i></i></a>
                </div>
            </div>
        </nav>
    `
})