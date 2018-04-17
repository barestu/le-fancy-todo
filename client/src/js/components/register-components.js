Vue.component('register', {
  name: 'register',
  template: `
  <form class="">
    <div class="form-signin mt-3">
      <div class="form-group">
        <label class="ml-2">Name</label>
        <input type="text" class="form-control" v-model="name" name="name" value="" placeholder="Your Name">
      </div>
      <div class="form-group">
        <label class="ml-2">Email</label>
        <input type="text" class="form-control" v-model="email" name="email" value="" placeholder="example@email.com">
      </div>
      <div class="form-group">
        <label class="ml-2">Password</label>
        <input type="password" class="form-control" v-model="password" name="password" value="" placeholder="Your password">
      </div>
      <div class="form-group">
        <label class="ml-2">Confirm Password</label>
        <input type="password" class="form-control" v-model="confirmPass" name="confirmPass" value="" placeholder="Confirm your password">
      </div>
      <div class="form-group">
        <label class="ml-2">Birthday</label>
        <input type="date" class="form-control" v-model="birthday" name="birthday" value="" placeholder="YYYY-MM-DD">
      </div>
      <div class="form-group">
        <label class="ml-2">Gender</label>
        <div class="ml-3">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="gender" value="Male">
            <label class="form-check-label">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="gender" value="Female">
            <label class="form-check-label">Female</label>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <a href="/" class="btn btn-secondary px-5 mt-3">Cancel</a>
        <button @click.prevent="register" class="btn btn-primary px-5 mt-3">Register</button>
      </div>
    </div>
  </form>
  `,
  props: [],
  data: function() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      birthday: '',
      gender: [],
    }
  },

  methods: {
    register: function () {
      console.log('register clicked')

      axios.post('http://localhost:4000/user/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
        gender: this.gender
      })
      .then(response => {
        console.log('Register success', response)
        window.location.href = '/'
      })
      .catch(err => {
        console.log('Register failed', err)
      })
    }
  }
})