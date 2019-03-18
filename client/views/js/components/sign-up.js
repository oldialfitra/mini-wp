Vue.component('sign-up', {
    data() {
        return {
            user: {
                userEmail: '',
                userPassword: ''
            }
        }
    },
    methods: {
        register() {
            this.$emit('user-register', this.user)
        },
        changeToLogin() {
            this.$emit('change-login')
        }
    },
    template: `
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto" >
        <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center">Sign Up</h5>
                <form class="form-signin" v-on:submit.prevent="register">
                    <div class="form-label-group">
                        <input v-model="user.userEmail" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                        <label for="inputEmail">Email address</label>
                    </div>
                    <div class="form-label-group">
                        <input v-model="user.userPassword" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                        <label for="inputPassword">Password</label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Up</button>
                </form>
                <hr class="my-4">
                <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit" v-on:click="changeToLogin">Already have account?</button>
            </div>
        </div>
    </div>
    `
})

/* <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit" v-on:click="showLoginUser">Already have account?</button> */