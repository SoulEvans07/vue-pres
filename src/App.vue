<template>
  <div id="app">
    <div class="header">
      <h1>Todos</h1>
    </div>
    <div class="content">
      <div class="task-list">
        <TaskItem v-for="(task, index) in task_list"
          v-bind:task="task"
          v-bind:index="index"
          v-on:remove="removeTask"/>

        <div class="task">
          <i class="add fa fa-plus" v-on:click="addTask()"></i>
          <input class="text" type="text" 
            v-model="temp_task"
            v-on:keyup.enter="addTask()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskItem from './components/TaskItem'

  export default {
    name: 'app',
    components: { TaskItem },
    data() { return {
      temp_task: null,
      task_list: [
        { done: true, text: 'Learn Javascript' },
        { done: false, text: 'Learn ES6' },
        { done: false, text: 'Learn Vue' },
        { done: false, text: 'Build something awesome!' }
      ]
    }},
    methods: {
      addTask() {
        this.task_list.push({ done: false, text: this.temp_task });
        this.temp_task = null;
      },
      removeTask(index) {
        this.task_list.splice(index, 1);
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }

  * {
    outline: none;
  }

  input[type="button"], button {
    user-select: none;
  }
</style>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    display: flex;
    flex-direction: row;
    margin: 10px;
  }

  .content {
    margin: 0 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  .task-list {
    flex-grow: 0;
    margin-right: 10px;
  }

  .task-details {
    flex-grow: 1;
    height: 100%;
    display: flex;
  }

  @media only screen and (max-width: 859px) {
    .content {
      flex-direction: column;
    }

    .task-list {
      order: 1;
    }

    .task-details {
      order: 0;
    }
  }

  .task {
    display: flex;
    flex-direction: row;
    user-select: none;
    width: 400px;
    height: 30px;
    display: flex;
    flex-direction: row;
    margin: 5px 0;
  }

  .task > .add {
    background: #eee;
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    margin-right: 5px;
  }

  .task > .text {
    padding: 0 10px;
    flex-grow: 1;
    line-height: 30px;
    background: #eee;
    color: #2c3e50;
    font-size: 16px;
    border: none;
  }
</style>
