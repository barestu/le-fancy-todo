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
        window.location.href = 'https://be7dbe7d.ngrok.io/'
      }
    },

    logout: function() {
      console.log('log out clicked')
      localStorage.removeItem('token')
      window.location.href = 'https://be7dbe7d.ngrok.io/'
    }
  },
  
  beforeMount() {
    let location = window.location.href
    let indexPage = 'https://be7dbe7d.ngrok.io/'
    let registerPage = 'https://be7dbe7d.ngrok.io/register.html'

    if (location !== indexPage && location !== registerPage) {
      this.checkAuth()
    }
  }
})