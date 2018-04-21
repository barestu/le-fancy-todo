import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

// const baseUrl = 'http://localhost:4000'
const baseUrl = 'https://taskfan-server.herokuapp.com'
let token = localStorage.getItem('token')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    todosActive (state) {
      return state.todos.filter(todos => !todos.done)
    },
    todosComplete (state) {
      return state.todos.filter(todos => todos.done)
    },
    todosTomorrow (state) {
      let arrResult = []

      state.todos.forEach(todo => {
        let today = new Date()
        let dueDate = new Date(todo.due_date)

        today = today.getDate()
        dueDate = dueDate.getDate()

        let result = dueDate - today

        if (result < 2 && todo.done === false) {
          arrResult.push(todo)
        }
      })

      return arrResult
    }
  },
  mutations: {
    setTodos (state, todos) {
      state.todos = todos
    },

    addTodo (state, todo) {
      state.todos.push(todo)
      swal('Add new todo success!', ``, 'success')
    },

    changeStatus (state, data) {
      state.todos.forEach(todo => {
        if (todo._id === data.todo._id) {
          data.todo.done = data.status
          let index = state.todos.indexOf(todo)
          state.todos.splice(index, 1, data.todo)
        }
      })
    },

    updateTodo (state, data) {
      state.todos.forEach(todo => {
        if (todo._id === data._id) {
          let index = state.todos.indexOf(todo)
          state.todos.splice(index, 1, data)
          swal('Update todo success!', ``, 'success')
        }
      })
    },

    deleteTodo (state, data) {
      state.todos.forEach(todo => {
        if (todo._id === data._id) {
          let index = state.todos.indexOf(todo)
          state.todos.splice(index, 1)
          swal('Delete todo success!', ``, 'success')
        }
      })
    }
  },
  actions: {
    getTodos: ({commit}) => {
      axios.get(`${baseUrl}/todo`, {
        headers: { token }
      })
        .then(response => {
          commit('setTodos', response.data.todos)
        })
        .catch(error => {
          console.log('error show my todos', error)
        })
    },

    addTodos: ({commit}, newTodo) => {
      axios.post(`${baseUrl}/todo/add`, newTodo, {
        headers: { token }
      })
        .then(response => {
          commit('addTodo', response.data.todo)
        })
        .catch(error => {
          console.log('add failed', error)
        })
    },

    changeStatuses: ({commit}, data) => {
      axios.put(`${baseUrl}/todo/update/${data.todo._id}`, {
        task: data.todo.task,
        done: data.status,
        due_date: data.todo.due_date
      }, {
        headers: { token }
      })
        .then(response => {
          commit('changeStatus', data)
        })
        .catch(error => {
          console.log('change status failed', error)
        })
    },

    updateTodos: ({commit}, data) => {
      axios.put(`${baseUrl}/todo/update/${data._id}`, {
        task: data.task,
        done: data.done,
        due_date: data.due_date
      }, {
        headers: { token }
      })
        .then(response => {
          commit('updateTodo', data)
        })
        .catch(error => {
          console.log('update todo failed', error)
        })
    },

    deleteTodos: ({commit}, data) => {
      swal({
        title: 'Delete todo?',
        text: 'Are you sure want to delete this todo?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`${baseUrl}/todo/delete/${data._id}`, {
              headers: { token }
            })
              .then(response => {
                commit('deleteTodo', data)
              })
              .catch(error => {
                console.log('delete todo failed', error)
              })
          }
        })
    }
  }
})
