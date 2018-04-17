Vue.component('add-todo', {
  name: 'add-todo',
  template: `
  <div>
    <div class=text-center>
    <button type="button" class="btn btn-lg btn-warning mt-4 px-5 my-3font-weight-bold" data-toggle="modal" data-target="#modalAddTodo">
      Add New Task
    </button>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="modalAddTodo" tabindex="-1" role="dialog" aria-labelledby="modalAddTodoTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="ml-2">Name</label>
              <input type="text" class="form-control" v-model="taskName" name="taskName" placeholder="Task Name">
            </div>

            <div class="form-group">
              <label class="ml-2">Due Date</label>
              <input type="date" class="form-control" v-model="dueDate" name="dueDate" placeholder="Due Date">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addTask" type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: [],
  data: function() {
    return {
      taskName: '',
      dueDate: ''
    }
  },
  methods: {
    addTask: function () {
      let newTask = {
        taskName: this.taskName,
        dueDate: this.dueDate
      }

      axios.post('http://localhost:4000/todo/add', newTask, {
        headers: { token }
      })
      .then(response => {
        console.log('add success', response)
        // this.showMyTodos()
        window.location.reload()
      })
      .catch(err => {
        console.log('add failed', err)
      })
    },
  }
})