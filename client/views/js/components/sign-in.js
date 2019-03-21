Vue.component('sign-in', {
    data() {
        return {
            user: {
                userEmail: '',
                userPassword: ''
            }
        }
    },
    methods: {
        login() {
            this.$emit('user-login', this.user)
        },
        changeToRegister() {
            this.$emit('change-register')
        },
        googleSignIn() {
            this.$emit('google-login')
        }
    },
    template: `
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center">Sign In</h5>
                <form class="form-signin" v-on:submit.prevent="login">
                    <div class="form-label-group">
                        <input v-model="user.userEmail" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                        <label for="inputEmail">Email address</label>
                    </div>
                    <div class="form-label-group">
                        <input v-model="user.userPassword" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                        <label for="inputPassword">Password</label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    
                </form>
                <hr class="my-4">
                <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit" v-on:click="googleSignIn"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit" v-on:click="changeToRegister">Need new account?</button>
            </div>
        </div>
    </div>
    `
})