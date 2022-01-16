<!-- layout -->
<template>
  <div class="app-container">
    <!-- 侧边栏 -->
    <side-bar class="sidebar-container"></side-bar>
    <!-- 内容容器 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <nav-bar />
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/navBar.vue';
import AppMain from './components/appMain.vue';
import SideBar from './components/sideBar/index.vue';
</script>
<style scoped>
</style>
