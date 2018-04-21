<template>
  <div class="container h-100">
    <div class="row justify-content-center h-100">
      <div class="col-lg-4 col-md-6 col-sm-10 col-xs-10  my-auto">
        <div class="card text-center p-4">
          <h1>Welcome to Taskfan</h1>

          <form class="text-center">
            <div class="form-signin mt-3">
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <input type="email" class="form-control" v-model="email" id="emailInput" placeholder="Enter email">
              <input type="password" class="form-control" v-model="password" id="passwordInput" placeholder="Enter password">

              <div class="mt-4">
                <button type="submit" @click.prevent="login" class="btn btn-primary px-5 font-weight-bold">Sign In</button>
              </div>

              <div class="mt-3">
                <p>- or -</p>
                <button type="submit" @click.prevent="fbLogin" class="btn btn-facebook">
                  <i class="fa fa-facebook fa-fw"></i>
                   Login with Facebook
                </button>
              </div>

              <div class="mt-3">
                <p><router-link to="/register">Don't have an account yet? Sign Up</router-link></p>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    login (context, user) {
      axios.post(`${this.$baseUrl}/user/login`, {
        email: this.email,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.$isLogin = true
          this.$router.push('/')
        })
        .catch(error => {
          console.log('Login failed', error)
          this.errorMessage = 'Invalid email/password!'
        })
    },

    fbLogin (context) {
      window.FB.login((response) => {
        if (response.authResponse) {
          let tokenFB = response.authResponse.accessToken

          axios.post(`${this.$baseUrl}/user/fb-login`, {}, {
            headers: { tokenFB }
          })
            .then(response => {
              console.log('logged in', response)
              localStorage.setItem('token', response.data.token)
              this.$isLogin = true
              this.$router.push('/')
            })
            .catch(error => {
              console.log('login failed', error)
            })
        } else {
          console.log('fb connect failed')
        }
      })
    }
  },
  created: function () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1366559306776878',
        cookie: true,
        xfbml: true,
        version: 'v2.12'
      })
    }
  }
}
</script>

<style>
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
}

.form-signin .form-control:focus {
  z-index: 2;
}

input#emailInput {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input#passwordInput {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn-facebook {
  background: #3B5998;
  border-radius: 0;
  color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #263961;
}
.btn-facebook:link, .btn-facebook:visited {
  color: #fff;
}
.btn-facebook:active, .btn-facebook:hover {
  background: #263961;
  color: #fff;
}
</style>
