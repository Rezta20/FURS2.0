<template>
  <el-dialog v-model="visible" title="刪除客戶" width="400px" align-center>
    <div>
      是否確定刪除
      <span style="color: var(--el-color-primary)"> {{ customerName }}</span> ?
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" plain>取消</el-button>
      <el-button type="danger" @click="confirmDelete">確定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "DeleteCustomerDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue", "confirm"],
  setup(props, { emit }) {
    const visible = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    const closeDialog = () => {
      emit("update:modelValue", false);
    };

    const confirmDelete = () => {
      emit("confirm");
      emit("update:modelValue", false);
    };

    return {
      visible,
      closeDialog,
      confirmDelete,
    };
  },
});
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
