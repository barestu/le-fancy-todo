Vue.component('login', {
  name: 'login',
  template: `
  <div class="login-form col-md-6 offset-md-3">
    <div class="text-center pt-4">
      <h1>Welcome to Taskfan</h1>
    </div>

    <form class="text-center">
      <div class="form-signin mt-3">

        <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" placeholder="Enter email">
        <input type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="Enter password">
  
        <div class="mt-4">
          <button type="submit" @click.prevent="login" class="btn btn-primary px-5 font-weight-bold">Sign In</button>
        </div>
        
        <div class="mt-3">
          <p>- or -</p>
          <div scope="public_profile,email" onlogin="checkLoginState();" class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
        </div>

        <div class="mt-3">
          <p><a href="register.html">Don't have an account yet? Sign Up</a></p>
        </div>

      </div>
    </form>
  </div>
  `,
  props: [],
  data: function () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login: function() {
      axios.post('http://localhost:4000/user/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log('Logged in', response)
        localStorage.setItem('token', response.data.token)
        window.location.href = 'https://4a55af47.ngrok.io/main.html'
      })
      .catch(err => {
        console.log('Login failed', err)
      })
    },
  }
})