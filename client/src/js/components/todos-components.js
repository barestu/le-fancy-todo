const token = localStorage.getItem('token')

Vue.component('todos', {
  name: 'todos',
  template: `
  <div class="container">
    <form v-on:submit.prevent="addTask">
      <label for="task">Task</label>
      <input type="text" class="form-control" v-model="taskName">
      <label for="due">Due Date</label>
      <input type="date" class="form-control" v-model="dueDate">
      <button @click="showMyTodos" class="btn btn-primary" type="submit">Submit Task</button>
    </form>

    <div class="todo-list p-4">
      <h1>Your Todos</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos">
            <td>{{ todo.task }}</td>
            <td>{{ dateFormat(todo.due_date) }}</td>
            <td>{{ todo.done }}</td>
            <td>
              <button @click="changeTaskStatus(todo, true)" class="btn btn-sm btn-success">Check</button>
              <button @click="changeTaskStatus(todo, false)" class="btn btn-sm btn-warning">Uncheck</button>
              <button @click="setUpdateForm(todo)" class="btn btn-sm btn-info" data-toggle="modal" data-target="#exampleModalCenter">Update</button>
              <button @click="deleteTask(todo)" class="btn btn-sm btn-danger">Delete</button>

              <!-- Modal -->
              <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">Edit Task</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form class="">
                        <div class="form-signin mt-3">
                          <div class="form-group">
                            <label class="ml-2">Name</label>
                            <input type="text" class="form-control" v-model="update.task" name="task" placeholder="Task Name">
                          </div>

                          <div class="form-group">
                            <label class="ml-2">Due Date</label>
                            <input type="date" class="form-control" v-model="update.due_date" name="due_date" placeholder="Due Date">
                          </div>
                          
                          <div class="form-group">
                            <label class="ml-2">Status</label>
                            <div class="ml-3">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" name="todo.done" v-model="update.done" value="true" class="custom-control-input">
                                <label class="custom-control-label" for="customRadioInline1">Done</label>
                              </div>
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" name="todo.done" v-model="update.done" value="false" class="custom-control-input">
                                <label class="custom-control-label" for="customRadioInline2">On Going</label>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button @click="updateTask(update)" type="button" class="btn btn-primary" data-dismiss="modal">Update</button>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div> 
  `,
  props: [],

  data: function () {
    return {
      taskName: '',
      dueDate: '',
      todos: [],
      update: {
        _id: '',
        task: '',
        due_date: '',
        done: '',
      }
    }
  },

  methods: {
    showMyTodos: function () {
      this.todos = []

      axios.get('https://taskfan-server.herokuapp.com/todo/', {
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

    addTask: function () {
      let newTask = {
        taskName: this.taskName,
        dueDate: this.dueDate
      }

      axios.post('https://taskfan-server.herokuapp.com/todo/add', newTask, {
        headers: { token }
      })
      .then(response => {
        console.log('add success', response)
        this.showMyTodos()
      })
      .catch(err => {
        console.log('add failed', err)
      })
    },

    changeTaskStatus: function (todo, status) {
      let task_id = todo._id

      axios.put(`https://taskfan-server.herokuapp.com/todo/update/${task_id}`, {
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

      axios.put(`https://taskfan-server.herokuapp.com/todo/update/${task_id}`, {
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

      axios.delete(`https://taskfan-server.herokuapp.com/todo/delete/${task_id}`, {
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

  mounted: function () {
    this.$nextTick(function () {
      this.showMyTodos()
    })
  }
})