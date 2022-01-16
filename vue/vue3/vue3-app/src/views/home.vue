<!--  -->
<template>
  <div @click="toMe">我是home页面</div>
  <div @click="$store.commit('add')">{{ $store.state.counter }}</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: '',
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
    const toMe = () => {
      // const route = useRouter(); // todo 为啥写在这里会报错？

      // 设置路由
      console.log('log:', route);
      // query编程式导航传参
      route.push({
        path: '/me',
        query: {
          id: 666,
        },
      });
      // params编程式导航传参
      // route.push({
      //   name: 'me',
      //   params: {
      //     id: 666,
      //   },
      // });

      // 读取路由
      // const route = useRoute();
      // console.log(route.query.id); // 666
    };

    const refData = toRefs(data);
    return {
      ...refData,
      toMe,
    };
  },
};
</script>
<style scoped>
</style>
