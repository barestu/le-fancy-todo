<template>
  <div class="container h-100">
    <div class="row justify-content-center h-100">
      <div class="col-lg-6 col-md-6 col-sm-10 col-xs-10  my-auto">
        <div class="card p-4">
          <h1 class="text-center">Register</h1>

          <form @submit.prevent="register">
            <div class="form-signin mt-3">
              <div class="form-group">
                <label class="ml-2" >Name</label>
                <input type="text" class="form-control" v-model="name" name="name" value="" placeholder="Your Name" required>
              </div>
              <div class="form-group">
                <label class="ml-2">Email</label>
                <input type="text" class="form-control" :class="{ error: wrongEmail }" v-model="email" name="email" value="" placeholder="example@email.com" required>
              </div>
              <div class="form-group">
                <label class="ml-2">Password</label>
                <input type="password" class="form-control" :class="{ error: wrongPassword }" v-model="password" name="password" value="" placeholder="Your password" required>
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

              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="text-center">
                <router-link to="/login">
                  <button class="btn btn-secondary px-5 mt-3 mx-1">
                    Cancel
                  </button>
                </router-link>
                <button type="submit" class="btn btn-primary px-5 mt-3 mx-1">Register</button>
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
import swal from 'sweetalert'

export default {
  name: 'Register',
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      birthday: '',
      gender: '',
      wrongEmail: false,
      wrongPassword: false,
      errorMessage: ''
    }
  },
  methods: {
    register () {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
        gender: this.gender
      }

      axios.post(`${this.$baseUrl}/user/register`, newUser)
        .then(response => {
          swal('Register Success!', 'Now you can proceed to login!', 'success')
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = 'Error invalid email/password'
        })
    }
  },
  watch: {
    email () {
      let re = /\S+@\S+\.\S+/
      let result = re.test(this.email)

      if (!result) {
        this.wrongEmail = true
      } else {
        this.wrongEmail = false
      }
    },
    password: function () {
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
      let result = re.test(this.password)

      if (!result) {
        this.wrongPassword = true
      } else {
        this.wrongPassword = false
      }
    }

  }
}
</script>

<style>
  .error {
    border: 2px solid rgb(216, 75, 75)
  }
</style>
