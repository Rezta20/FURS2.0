<template>
  <div>
    <h1>Store Information</h1>
    <el-form @submit.native.prevent="updateStoreInfo">
      <el-form-item>
        <el-input v-model="storeInfo.name" placeholder="Store Name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="storeInfo.address" placeholder="Address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="storeInfo.contact" placeholder="Contact"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="storeInfo.hours" placeholder="Business Hours"></el-input>
      </el-form-item>
      <el-button type="primary" @click="updateStoreInfo">Update Store Info</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStoreStore } from "@/stores/store";

export default defineComponent({
  name: "StoreInfoPage",
  setup() {
    const storeStore = useStoreStore();
    const storeInfo = ref({ ...storeStore.storeInfo });

    const updateStoreInfo = () => {
      storeStore.updateStoreInfo(storeInfo.value);
      alert("Store info updated");
    };

    return { storeInfo, updateStoreInfo };
  },
});
</script>
