<template>
  <el-dialog v-model="visible" title="編輯服務項目" width="500px" align-center>
    <el-form label-width="100px">
      <el-form-item label="服務名稱" :error="nameError">
        <el-input v-model="service.name" size="large" placeholder="服務名稱" />
      </el-form-item>
      <el-form-item label="價格" :error="priceError">
        <el-input
          v-model.number="service.price"
          size="large"
          placeholder="價格"
          type="number"
          min="0"
          @input="validatePrice"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="closeDialog" plain>取消</el-button>
      <el-button type="primary" @click="saveService" plain>更新</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from "vue";

export default defineComponent({
  name: "EditServiceDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    service: {
      type: Object as PropType<{ name: string; price: number }>,
      required: true,
    },
  },
  emits: ["update:modelValue", "save"],

  setup(props, { emit }) {
    const nameError = ref("");
    const priceError = ref("");

    const visible = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    const validatePrice = () => {
      if (props.service.price < 0) {
        priceError.value = "價格不可為負數";
      } else if (props.service.price === 0) {
        priceError.value = "價格不可為0";
      } else {
        priceError.value = "";
      }
    };

    const closeDialog = () => {
      emit("update:modelValue", false);
    };

    const saveService = () => {
      if (!props.service.name) {
        nameError.value = "請填寫服務名稱";
      } else {
        nameError.value = "";
      }

      if (props.service.price === null || props.service.price === undefined) {
        priceError.value = "請填寫價格並以數字輸入";
      } else if (props.service.price < 0) {
        priceError.value = "價格不可為負數";
      } else if (props.service.price === 0) {
        priceError.value = "價格不可為 0";
      } else {
        priceError.value = "";
      }

      if (!nameError.value && !priceError.value) {
        emit("save");
      }
    };

    return {
      nameError,
      priceError,
      validatePrice,
      closeDialog,
      saveService,
      visible,
    };
  },
});
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
.el-form-item {
  display: flex;
  align-items: center;
}
.el-form-item label {
  width: 100px; /* 確保標籤寬度一致 */
}
.el-input {
  width: calc(100% - 70px); /* 保證輸入框寬度一致 */
}
</style>
