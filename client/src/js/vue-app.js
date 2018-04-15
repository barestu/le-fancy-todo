let vue = new Vue({
  el: '#app',
  data: {
    isLogin: false,
  },
  methods: {
    checkAuth: function() {
      let token = localStorage.getItem('token')

      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
        window.location.href = 'https://taskfan-201211.firebaseapp.com/'
      }
    },

    logout: function() {
      console.log('log out clicked')
      localStorage.removeItem('token')
      window.location.href = 'https://taskfan-201211.firebaseapp.com/'
    }
  },
  
  beforeMount() {
    let location = window.location.href
    let indexPage = 'https://taskfan-201211.firebaseapp.com/'
    let registerPage = 'https://taskfan-201211.firebaseapp.com/register.html'

    if (location !== indexPage && location !== registerPage) {
      this.checkAuth()
    }
  }
})