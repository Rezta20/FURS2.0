<template>
  <div>
    <h1>Login</h1>
    <el-form @submit.native.prevent="handleSubmit">
      <el-form-item>
        <el-input v-model="form.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleLogin">Login</el-button>
      <el-button @click="handleRegister">Register</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const form = ref({
      username: "",
      password: "",
    });

    const handleLogin = () => {
      if (userStore.login(form.value.username, form.value.password)) {
        router.push("/store");
      } else {
        alert("Invalid username or password");
      }
    };

    const handleRegister = () => {
      userStore.register(form.value);
      alert("Registration successful");
      handleLogin(); // 註冊後自動登錄
    };

    const handleSubmit = () => {
      console.log("hi");
    };

    return { form, handleLogin, handleSubmit, handleRegister };
  },
});
</script>
