let vue = new Vue({
  el: '#app',
  data: {
    isLogin: false,
    taskName: '',
    dueDate: '',
    listTodos: [],
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
    },

    addTask: function() {
      let token = localStorage.getItem('token')
      let newTask = {
        taskName: this.taskName,
        dueDate: this.dueDate
      }

      axios.post('http://localhost:4000/todo/add', newTask, {
        headers: { token }
      })
      .then(response => {
        console.log('add success', response)
      })
      .catch(err => {
        console.log('add failed', err)
      })
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