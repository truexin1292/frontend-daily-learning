<template>
  <h1>{{ msg }}</h1>
  <!-- <button @click="count++">count is: {{ count }}</button> -->
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <div>
    <!-- {{ data.counter }} -->
    {{ counter }}
  </div>
  <div>
    <!-- {{ data.doubleCounter }} -->
    {{ doubleCounter }}
  </div>
  <p ref="desc"></p>
  <TeleportCom />
  <!-- <EmitsCom @click="onClick" /> -->
  <EmitsCom @myClick="onClick" />
</template>

<script>
import { reactive, computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue';
import TeleportCom from './teleportCom.vue'; //vite开发必须加文件名称的后缀，告诉vite使用什么方式来处理文件内容
import EmitsCom from './emitsCom2.vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    TeleportCom,
    EmitsCom,
  },
  // data() {
  //   return {
  //     counter: 0,
  //   };
  // },
  methods: {
    onClick() {
      console.log('log:', '33');
    },
  },
  setup() {
    // counter相关处理逻辑
    // const data = useCounter();
    const { counter, doubleCounter } = useCounter(); // 配合toRefs才能导出

    // other，其他的处理逻辑
    // 其他数据，单值响应式
    const msg2 = ref('some messgae!');

    // 使用元素引用
    const desc = ref(null);

    // 监听器
    watch(counter, (val, oldVal) => {
      const p = desc.value; // ref的值
      p.textContent = `change from ${oldVal} to ${val}`;
    });

    return {
      // data,
      counter,
      doubleCounter,
      msg2,
      desc,
    };
  },
};

function useCounter() {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2),
  });
  let timer = null;

  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
    timer = null;
  });

  // return data; // 必须使用data
  return toRefs(data); // 可以展开的
}
</script>
