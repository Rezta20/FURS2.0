<template>
  <div id="app">
    <div class="sidebar">
      <Menu />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./components/Ｍenu.vue";

export default defineComponent({
  name: "App",
  components: {
    Menu,
  },
});
</script>

<style>
#app {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  background-color: #ecf5ff;
}

.content {
  flex-grow: 1;
  padding: 1em;
  background-color: #fafafa;
}
</style>
