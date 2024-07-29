<template>
  <el-dialog v-model="visible" title="新增寵物" width="400px" align-center>
    <el-form :model="petForm" label-width="120px">
      <el-form-item label="寵物名字">
        <el-input v-model="petForm.name"></el-input>
      </el-form-item>
      <el-form-item label="寵物種類">
        <el-input v-model="petForm.type"></el-input>
      </el-form-item>
      <el-form-item label="寵物品種">
        <el-input v-model="petForm.breed"></el-input>
      </el-form-item>
      <el-form-item label="寵物年齡">
        <el-input type="number" v-model="petForm.age"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" plain>取消</el-button>
      <el-button type="primary" @click="confirmAddPet" plain>確定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "AddPetDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue", "add-pet"],
  setup(props, { emit }) {
    const visible = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    const petForm = ref({
      id: "",
      name: "",
      type: "",
      breed: "",
      age: 0,
    });

    const closeDialog = () => {
      emit("update:modelValue", false);
    };

    const confirmAddPet = () => {
      petForm.value.id = Date.now().toString();
      emit("add-pet", { ...petForm.value });
      closeDialog();
    };

    return {
      visible,
      petForm,
      closeDialog,
      confirmAddPet,
    };
  },
});
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
