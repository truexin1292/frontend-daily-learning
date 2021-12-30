<!-- script setup -->
<template>
  <div>{{ msg }}</div>
  <div class="setup-com" @click="onclick">我是setup-script组件{{ count }}</div>
</template>

<script setup>
import { reactive, defineProps, defineEmits, useAttrs, toRefs } from 'vue';
//useContext 被替换成=> attrs = useAttrs, emit = defineEmits, expose = defineExpose, slots = useSlots

const props = defineProps(['msg']);
// defineProps({
//   msg: String,
// });
console.log('props:', props);

// const emits = defineEmits(['myclick']);
const emits = defineEmits({
  myclick: Function,
});
console.log('emits:', emits);

const onclick = () => {
  emits('myclick');
  state.count++;
};

const state = reactive({
  count: 1,
}); // 不可结构

const { count } = toRefs(state); // 可结构
</script>
<style scoped>
</style>
