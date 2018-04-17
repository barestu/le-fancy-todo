const token = localStorage.getItem('token')

let vue = new Vue({
  el: '#app',
  data: {
    todos: [],
    isLogin: false,
    update: {
      _id: '',
      task: '',
      due_date: '',
      done: '',
    },
    taskName: '',
    dueDate: '',
  },
  methods: {
    checkAuth: function() {
      let token = localStorage.getItem('token')

      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
        window.location.href = 'https://5687cd5c.ngrok.io/'
      }
    },

    logout: function() {
      console.log('log out clicked')
      localStorage.removeItem('token')
      window.location.href = 'https://5687cd5c.ngrok.io/index.html'
    },

    showMyTodos: function () {
      this.todos = []

      axios.get('http://localhost:4000/todo/', {
        headers: { token }
      })
      .then(response => {
        console.log('show my todo', response)
        response.data.todos.forEach(todo => {
          this.todos.push(todo)
        })
      })
      .catch(err => {
        console.log('error show todo', err)
      })
    },

    changeTaskStatus: function (todo, status) {
      let task_id = todo._id

      axios.put(`http://localhost:4000/todo/update/${task_id}`, {
        task: todo.task,
        done: status,
        due_date: todo.due_date
      }, {
        headers: { token }
      })
      .then(response => {
        console.log('set as done success', response)
        this.showMyTodos()
      })
      .catch(err => {
        console.log('set as done failed', err)
      })
    },

    updateTask: function (todo) {
      let task_id = todo._id

      console.log(todo.task)

      axios.put(`http://localhost:4000/todo/update/${task_id}`, {
        task: this.update.task,
        done: this.update.done,
        due_date: this.update.due_date
      }, {
        headers: { token }
      })
      .then(response => {
        console.log('update success', response)
        this.showMyTodos()
      })
      .catch(err => {
        console.log('update failed', err)
      })
    },

    setUpdateForm: function (todo) {
      console.log('here', todo.task)
      this.update._id = todo._id
      this.update.task = todo.task
      this.update.due_date = this.dateFormat(todo.due_date)
    },
    
    deleteTask: function (todo) {
      let task_id = todo._id

      axios.delete(`http://localhost:4000/todo/delete/${task_id}`, {
        headers: { token }
      })
      .then(response => {
        console.log('delete success', response)
        this.showMyTodos()
      })
      .catch(err => {
        console.log('delete failed', err)
      })
    },

    dateFormat: function (date) {
      let newDate = new Date(date)
      let year = newDate.getFullYear() + ''
      let month = newDate.getMonth() + 1 + ''
      let day = newDate.getDate() + ''

      if (month.length == 1) {
        month = `0${month}`
      }
      
     newDate = `${year}-${month}-${day}`
      
      return newDate
    }
  },

  computed: {
    todoActive: function () {
      let result = []

      this.todos.forEach(todo => {
        if (todo.done == false) {
          result.push(todo)
        }
      })

      return result
    },

    todoDone: function () {
      let result = []

      this.todos.forEach(todo => {
        if (todo.done == true) {
          result.push(todo)
        }
      })

      return result
    }
  },
  
  mounted: function () {
    this.$nextTick(function () {
      this.showMyTodos()
    })
  },
  
  beforeMount() {
    let location = window.location.href
    let indexPage = 'https://5687cd5c.ngrok.io/'
    let registerPage = 'https://5687cd5c.ngrok.io/register.html'

    if (location !== indexPage && location !== registerPage) {
      this.checkAuth()
    }
  }
})