<!-- 自定义事件 -->
<template>
  <!-- <div class="emits" @click="$emit('click')"> -->
  <div class="emits" @click="$emit('my-click')">
    <h3>自定义事件{{ state.counter }}</h3>
  </div>
  <SetupCom @myclick="onmyclick" msg="Hello Vue 3.0 + Vite" ref="hw" />
</template>

<script setup>
import { reactive, defineEmits, ref } from 'vue';
import SetupCom from './setupCom.vue';

const hw = ref(null);

defineEmits(['my-click']);

const onmyclick = () => {
  console.log('log:', hw, hw.value);
};

const state = reactive({
  counter: 1,
});
</script>
<style scoped>
.emits {
  height: 30px;
  background: green;
}
</style>
