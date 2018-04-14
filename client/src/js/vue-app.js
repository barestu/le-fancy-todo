let vue = new Vue({
  el: '#app',
  data: {
    taskName: '',
    dueDate: '',
    listTodos: [],
  },
  methods: {
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
  }
})