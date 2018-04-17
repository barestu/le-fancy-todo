Vue.component('done-todo', {
  name: 'done-todo',
  template: `
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
      <tr v-for="todo in done">
        <td>{{ todo.task }}</td>
        <td>{{ todo.due_date }}</td>
        <td>{{ todo.done }}</td>
        <td>
          <button @click="" class="btn btn-sm btn-success">Check</button>
          <button @click="" class="btn btn-sm btn-warning">Uncheck</button>
          <button @click="" class="btn btn-sm btn-info" data-toggle="modal" data-target="#exampleModalCenter">Update</button>
          <button @click="" class="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  props: ['done']
})