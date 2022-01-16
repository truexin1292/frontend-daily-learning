<!--  -->
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
    <Comp />
    <p @click="goHome" class="back-btn">返回首页</p>
    <el-button type="primary">按钮</el-button>
    <el-input placeholder="ee" />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HelloWorld from 'coms/HelloWorld.vue';
import Comp from 'coms/jsx/comp.vue';

export default {
  name: '',
  components: {
    HelloWorld,
    Comp,
  },
  setup() {
    const route = useRouter();
    console.log('1-开始创建组件-setup');
    const data = reactive({});
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount');
    });
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted');
    });
    const refData = toRefs(data);
    const goHome = () => {
      // route.push({
      //   path: '/home',
      //   query: { id: 1 },
      //   replace: true,
      // });
      route.replace({
        path: '/home',
        query: { id: 1 },
        // replace: true,
      });
    };
    return {
      goHome,
      ...refData,
    };
  },
};
</script>
<style scoped lang="scss">
.back-btn {
  height: 40px;
  width: 100px;
  border-radius: 10px;
  background: #f00;
  color: #fff;
}
</style>
