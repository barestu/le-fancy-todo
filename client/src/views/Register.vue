<template>
  <div class="container h-100">
    <div class="row justify-content-center h-100">
      <div class="col-lg-6 col-md-6 col-sm-10 col-xs-10  my-auto">
        <div class="card p-4">
          <h1 class="text-center">Register</h1>

          <form>
            <div class="form-signin mt-3">
              <div class="form-group">
                <label class="ml-2">Name</label>
                <input type="text" class="form-control" v-model="newUser.name" name="name" value="" placeholder="Your Name">
              </div>
              <div class="form-group">
                <label class="ml-2">Email</label>
                <input type="text" class="form-control" v-model="newUser.email" name="email" value="" placeholder="example@email.com">
              </div>
              <div class="form-group">
                <label class="ml-2">Password</label>
                <input type="password" class="form-control" v-model="newUser.password" name="password" value="" placeholder="Your password">
              </div>
              <div class="form-group">
                <label class="ml-2">Birthday</label>
                <input type="date" class="form-control" v-model="newUser.birthday" name="birthday" value="" placeholder="YYYY-MM-DD">
              </div>
              <div class="form-group">
                <label class="ml-2">Gender</label>
                <div class="ml-3">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="newUser.gender" value="Male">
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="newUser.gender" value="Female">
                    <label class="form-check-label">Female</label>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <router-link to="/login">
                  <button class="btn btn-secondary px-5 mt-3 mx-1">
                    Cancel
                  </button>
                </router-link>
                <button @click.prevent="register(newUser)" class="btn btn-primary px-5 mt-3 mx-1">Register</button>
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
      newUser: {
        name: '',
        email: '',
        password: '',
        birthday: '',
        gender: ''
      }
    }
  },
  methods: {
    register (context, newUser) {
      axios.post(`${this.$baseUrl}/user/register`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        birthday: newUser.birthday,
        gender: newUser.gender
      })
        .then(response => {
          console.log('register success', response)
          swal('Register Success!', 'Now you can proceed to login!', 'success')
          this.$router.push('/login')
        })
        .catch(error => {
          console.log('register failed', error)
        })
    }
  }
}
</script>

<style>

</style>
