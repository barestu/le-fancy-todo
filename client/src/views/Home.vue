<template>
  <div class="h-100">

    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Taskfan</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Nav Menu -->
      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div class="dropdown">
              <button class="btn btn-info dropdown-toggle mx-2 my-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span v-if="todosTomorrow.length" class="badge badge-danger mr-2">{{ todosTomorrow.length }}</span>
                <span class="fa fa-bell"></span>
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <TodoNotif v-for="(todo, index) in todosTomorrow" :todo="todo" :key="index" />
              </div>
            </div>
          </li>
          <li class="nav-item">
            <button @click="logout" class="btn btn-danger mx-2 my-1">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Content -->
    <div class="container">
      <div class="row justify-content-center h-100">
        <div class="col-12  my-auto">
          <div class="text-center text-light py-4">
            <h1 class="display-3">Welcome to TaskFan!</h1>
            <h4>Start your day by listing your activity and have some fun!</h4>
            <!-- Add New Task -->
            <button class="btn btn-warning font-weight-bold text-dark mt-3 px-5 py-2" data-toggle="modal" data-target="#modalAddTodo">
              Add New Task
            </button>
          </div>
          <!-- Modal Add New Task-->
          <div class="modal fade" id="modalAddTodo" tabindex="-1" role="dialog" aria-labelledby="modalAddTodoTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add New Task</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label class="ml-2">Name</label>
                    <input type="text" class="form-control" v-model="newTask.taskName" name="taskName" placeholder="Task Name">
                  </div>
                  <div class="form-group">
                    <label class="ml-2">Due Date</label>
                    <input type="date" class="form-control" v-model="newTask.dueDate" name="dueDate" placeholder="Due Date">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button @click="addTodos(newTask)" type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Content -->
          <div id="accordion">
            <!-- Active Todo -->
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-warning" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Show Active Todo
                  </button>
                </h5>
              </div>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Due Date</th>
                        <th class="text-center" scope="col">Status</th>
                        <th class="text-center" scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Todo v-for="(todo, index) in todosActive" :todo="todo" :key="index" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- Complete Todo -->
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button class="btn btn-success collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Show Complete Todo
                  </button>
                </h5>
              </div>
              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Due Date</th>
                        <th class="text-center" scope="col">Status</th>
                        <th class="text-center" scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Todo v-for="(todo, index) in todosComplete" :todo="todo" :key="index" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- Show ALl -->
            <div class="card">
              <div class="card-header" id="headingThree">
                <h5 class="mb-0">
                  <button class="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Show All Todo
                  </button>
                </h5>
              </div>
              <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Due Date</th>
                        <th class="text-center" scope="col">Status</th>
                        <th class="text-center" scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Todo v-for="(todo, index) in todos" :todo="todo" :key="index" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Social Media Share -->
          <div class="text-center py-3 bg-light" id="social-media">
            <h5>Share To: </h5>
            <a class="mx-2" href="http://www.facebook.com/sharer.php?u=https://taskfan.barestu.com" target="_blank">
              <img src="https://simplesharebuttons.com/images/somacro/facebook.png" style="width: 30px;"  alt="Facebook" />
            </a>
            <a class="mx-2" href="https://plus.google.com/share?url=https://taskfan.barestu.com" target="_blank">
              <img src="https://simplesharebuttons.com/images/somacro/google.png" style="width: 30px;" alt="Google" />
            </a>
            <a class="mx-2" href="https://twitter.com/share?url=https://taskfan.barestu.com&amp;text=Todo%20Fancy%20Apps!&amp;hashtags=taskfan" target="_blank">
              <img src="https://simplesharebuttons.com/images/somacro/twitter.png" style="width: 30px;" alt="Twitter" />
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'
import TodoNotif from '@/components/TodoNotif.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Todo,
    TodoNotif
  },
  data () {
    return {
      newTask: {
        taskName: '',
        dueDate: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getTodos',
      'addTodos'
    ]),
    logout () {
      this.$router.push('/login')
      this.$isLogin = false
      localStorage.removeItem('token')
      // window.location.href = '/'
    }
  },
  computed: {
    ...mapState([
      'todos'
    ]),
    ...mapGetters([
      'todosActive',
      'todosComplete',
      'todosTomorrow'
    ])
  },
  mounted () {
    if (this.$isLogin) {
      this.getTodos()
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
</style>
