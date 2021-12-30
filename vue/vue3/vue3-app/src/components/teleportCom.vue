<!-- 可以添加到body后面 -->
<template>
  <div>
    <!-- modal open button -->
    <button class="modal-btn" @click="showModal = true">打开modal弹窗</button>
    <!-- modal -->
    <teleport to="body">
      <div class="modal" v-if="showModal">
        <div class="content">
          <p>弹窗title</p>
          <div>这是弹窗内容！</div>
          <button class="modal-close-btn" @click="showModal = false">关闭modal弹窗</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
export default {
  // 兼容vue2的方式
  // data() {
  //   return {
  //     showModal: false,
  //   };
  // },
  // vue3的方式
  setup() {
    console.log('1-开始创建组件-setup');
    const data = reactive({
      showModal: false,
    });
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount');
    });
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted');
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(10, 10, 10, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal .content {
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50vw;
    height: 60vh;
  }
</style>
