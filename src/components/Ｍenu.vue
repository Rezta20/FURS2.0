<template>
  <div class="flex center">
    <el-button
      @click="toggleCollapse"
      :icon="isCollapse ? 'Fold' : 'Expand'"
      :type="isCollapse ? '' : 'primary'"
      text
      size="large"
      style="margin-bottom: 16px; margin-left: 6px"
    />

    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      background-color="#ecf5ff"
      :collapse="isCollapse"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="/">Login</el-menu-item>
          <el-menu-item index="/store">Store Info</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="/services">Services</el-menu-item>
          <el-menu-item index="/employees">Employees</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>More</span></template>
          <el-menu-item index="/bookings">Bookings</el-menu-item>
          <el-menu-item index="/reviews">Reviews</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><IconMenu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><Document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Menu",
  setup() {
    const router = useRouter();
    const isCollapse = ref(true);
    const activeMenu = ref(router.currentRoute.value.path);

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    const handleSelect = (key: string) => {
      console.log("key", key);
      router.push(key);
      activeMenu.value = key;
    };

    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    return { isCollapse, activeMenu, handleOpen, handleClose, handleSelect, toggleCollapse };
  },
});
</script>

<style scoped>
:deep .el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
