<template>
  <div class="dropdown-item px-2">
    <div class="alert alert-warning p-2 m-0" role="alert">
      Task <strong>{{ todo.task }}</strong> due date is Tomorrow!
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoNotif',
  props: [
    'todo'
  ]
}
</script>

<style>

</style>
