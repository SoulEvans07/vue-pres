<template>
  <div class="task" :class="styleTask()">
    <div class="checkbox" v-on:click="switchTaskState()">
      <i class="fa fa-check" v-if="task.done"></i>
    </div>
    <div class="text">{{ task.text }}</div>
    <i class="remove fa fa-times" title="Delete" v-on:click="remove()"></i>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'TaskItem',
    props: [ 'task', 'index' ],
    methods: {
      styleTask() {
        let styleClass = [];
        if(this.task.done) styleClass.push('done');
        return styleClass;
      },
      switchTaskState() {
        this.task.done = !this.task.done;
        this.$store.commit('change-task', { index: this.index, task: this.task });
      },
      remove() {
        this.$store.commit('remove-task', this.index);
      }
    }
  }
</script>

<style scoped>
  .task {
    user-select: none;
    width: 400px;
    height: 30px;
    display: flex;
    flex-direction: row;
    margin: 5px 0;
  }

  .checkbox {
    background: #eee;
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    margin-right: 5px;
  }

  .remove {
    background: #eee;
    color: #da2b2b;
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    margin-left: 5px;
  }

  .text {
    padding: 0 10px;
    flex-grow: 1;
    background: #eee;
    line-height: 30px;
  }

  .task.done {
    color: #42b983;
  }

  .task.selected > .text, .task.selected > .checkbox, .task.selected > .remove {
    background: #42b983;
    color: white;
  }
</style>