<template>
  <tr>
    <td>{{ todo.task }}</td>
    <td>{{ dateFormat }}</td>
    <td class="text-center">
      <h5 v-if="todo.done"><span class="badge badge-success">Complete</span></h5>
      <h5 v-else><span class="badge badge-warning">On Going</span></h5>
    </td>
    <td class="text-center">
      <button @click="changeStatuses({ todo: todo, status: true })" class="btn btn-sm btn-success mx-1 my-1">Check</button>
      <button @click="changeStatuses({ todo: todo, status: false })" class="btn btn-sm btn-warning mx-1 my-1">Uncheck</button> |
      <button class="btn btn-sm btn-info mx-1 my-1" data-toggle="modal" :data-target="targetUpdateModal">Update</button>
      <button @click="deleteTodos(todo)" class="btn btn-sm btn-danger mx-1 my-1">Delete</button>
    </td>
    <!-- Modal Add New Task-->
    <div class="modal fade" :id="idUpdateModal">
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
              <input type="text" class="form-control" v-model="editData.task" name="taskName" placeholder="Task Name">
            </div>
            <div class="form-group">
              <label class="ml-2">Due Date</label>
              <input type="date" class="form-control" v-model="editData.due_date" name="dueDate" placeholder="Due Date">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="clearEdit" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateTodos(editData)" type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Todo',
  data () {
    return {
      idUpdateModal: `modal${this.todo._id}`,
      targetUpdateModal: `#modal${this.todo._id}`,
      cacheData: {
        _id: this.todo._id,
        task: this.todo.task,
        due_date: this.dateForm(this.todo.due_date),
        done: this.todo.done
      },
      editData: {
        _id: this.todo._id,
        task: this.todo.task,
        due_date: this.dateForm(this.todo.due_date),
        done: this.todo.done
      }
    }
  },
  props: [
    'todo'
  ],
  methods: {
    ...mapActions([
      'changeStatuses',
      'updateTodos',
      'deleteTodos'
    ]),
    clearEdit () {
      this.editData._id = this.cacheData._id
      this.editData.task = this.cacheData.task
      this.editData.due_date = this.cacheData.due_date
      this.editData.done = this.cacheData.done
    },
    dateForm: function (data) {
      let newDate = new Date(data)
      let year = newDate.getFullYear() + ''
      let month = newDate.getMonth() + 1 + ''
      let day = newDate.getDate() + ''

      if (month.length === 1) {
        month = `0${month}`
      }

      newDate = `${year}-${month}-${day}`

      return newDate
    }
  },
  computed: {
    dateFormat: function () {
      let newDate = new Date(this.todo.due_date)
      let year = newDate.getFullYear() + ''
      let month = newDate.getMonth() + 1 + ''
      let day = newDate.getDate() + ''

      if (month.length === 1) {
        month = `0${month}`
      }

      newDate = `${year}-${month}-${day}`

      return newDate
    }
  }
}
</script>

<style scoped>
.btn {
  width: 75px;
}

.btn-light {
  width: 35px;;
}

#share-buttons img {
padding: 5px;
border: 0;
box-shadow: 0;
display: inline;
}
</style>
