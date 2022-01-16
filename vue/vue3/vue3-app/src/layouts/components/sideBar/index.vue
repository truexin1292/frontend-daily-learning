<!-- sidebar -->
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="menuActiveText"
      :unique-opened="false"
      mode="vertical"
    >
      <side-bar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '@/router';
import sideBarItem from './sideBarItem.vue';
import variables from 'styles/variables.module.scss';

const activeMenu = computed(() => {
  const route = useRoute();
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>
<style scoped>
</style>
