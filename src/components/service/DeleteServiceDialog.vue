<template>
  <el-dialog v-model="visible" title="刪除服務項目" width="400px" align-center>
    <div>
      是否確定刪除
      <span style="color: var(--el-color-primary)"> {{ serviceName }}</span> ?
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" plain>取消</el-button>
      <el-button type="primary" @click="confirmDelete" plain>確定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from "vue";

export default defineComponent({
  name: "DeleteServiceDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    serviceName: {
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
