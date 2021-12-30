<!-- 自定义事件 -->
<template>
  <!-- <div class="emits" @click="$emit('click')"> -->
  <div class="emits" @click="addCounter">
    <h3>自定义事件 {{ counter }}</h3>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
export default {
  // emits: ['click'], // 避免原生事件重名，必须写；推荐写，最佳实践
  // emits: ['my-click'], // 这样子可以不写也行
  emits: ['myClick'], // 这样子可以不写也行
  setup(props, context) {
    console.log('1-开始创建组件-setup', props, context);
    const data = reactive({
      counter: 1,
    });
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount');
    });
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted');
    });
    function addCounter() {
      data.counter++;
      context.emit('myClick');
    }
    const refData = toRefs(data);
    return {
      ...refData,
      addCounter,
    };
  },
};
</script>
<style scoped>
.emits {
  height: 30px;
  background: green;
}
</style>
